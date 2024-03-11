const URL = "https://restcountries.com/v3/all";

const h1 = document.querySelector("h1");
const listOne = document.getElementById("list_one");
const input = document.getElementById("input");
const countries = document.querySelector(".countries");
let getCountry = [];

window.addEventListener("load", () => {
    getUrl();
})

const getUrl = async () => {
    try {
        const res = await fetch(URL);
        if(!res.ok){
            throw new Error(`${res.status}`);
        }
        const data = await res.json();
        renderNew(data);
    } catch (error) {
        renderError(error);
    }
};

const renderError = (err) => {
    h1.innerHTML = `<h3>${err}</h3>`;
};


const renderNew = (data) => {
    const countryName = data.forEach((e) => {
        const { common } = e.name;
        listOne.innerHTML += `<option value="${common}">${common}</option>`;
        getCountry = data;
    });
};

input.addEventListener("change", () => {
    const inputValue = input.value;
    if(input.value){
        const selectedCountry = getCountry.filter(
            (e) => e.name.common === inputValue
        );
        renderCountry(selectedCountry[0]);
    }
});

const renderCountry = (c) => {
    const {
      name: { common },
      region,
      languages,
      currencies,
      population,
      borders,
      maps,
      capital,
    } = c;
    const countries = document.querySelector(".countries");
    countries.innerHTML = `
      <div class="card" >
      <img src=" ${c.flags[1]}" class="imgClass" alt="flag" />
      <div><h5 class="">${common}</h5></div>
      <p><i class="fa-solid fa-earth-oceania"></i> Region:${region}</p>
      <p> <i class="fas fa-lg fa-landmark"></i>Capitals:${capital}</p>
      <p>  <i class="fas fa-lg fa-comments"></i>Languages:${Object.values(
      languages
      )}</p>
      <p>  <i class="fas fa-lg fa-money-bill-wave"></i> Currencies:${
      Object.values(currencies)[0].name
      },${Object.values(currencies)[0].symbol}</p>
      <p> <i class="fa-solid fa-people-group"></i></i>Population:${population.toLocaleString(
      "en-US"
      )}</p>
      <p>  <i class="fa-sharp fa-solid fa-road-barrier"></i>Borders:${
      borders ? borders : "None"
      }</p>
      <p><i class="fa-solid fa-map-location-dot"></i>Map:<a href=${
      maps.googleMaps
      } target='_blank'> Go to google map</a></p></div>
      `;
  };
