"use strict";

const btn = document.querySelector(".btn-country");
const newContainer = document.querySelector(".container");

const inpCounrty = document.querySelector(".inp_country");
const inpCounrtyValue = document.querySelector(".inp_country_value");
const inpNeig = document.querySelector(".inp_neighbour");

const countryCard = (countryData, borderCountryStyle = "") => {
  const cardStructure = `
                  <article class=${
                    borderCountryStyle ? borderCountryStyle : "country"
                  }>
                      <img class="country__img" src="${countryData.flag}" />
                      <div class="country__data">
                        <h3 class="country__name">${countryData.name}</h3>
                        <h4 class="country__region">REGION ${
                          countryData.region
                        }</h4>
                        <p class="country__row"><span>👫</span>${(
                          +countryData.population / 1000000
                        ).toFixed(2)} people</p>
                        <p class="country__row"><span>🗣️</span>${
                          countryData.languages[0].name
                        }</p>
                        <p class="country__row"><span>💰</span>${
                          countryData.currencies[0].name
                        } <span> ${countryData.currencies[0].symbol}</span></p>
                      </div>
                  </article>          
    `;

  return cardStructure;
};

function renderCountry(data, data2, className = "") {
  const countriesContainer = document.createElement("div");
  countriesContainer.setAttribute("class", "countries");

  if (data2) {
    countriesContainer.insertAdjacentHTML("beforeend", countryCard(data));
    countriesContainer.insertAdjacentHTML(
      "beforeend",
      countryCard(data2, className)
    );
  } else {
    countriesContainer.insertAdjacentHTML("beforeend", countryCard(data));
  }

  // console.log(countriesContainer);
  newContainer.append(countriesContainer);

  countriesContainer.style.opacity = 1;
}

/// my own country project
async function getCountryDataPro(country, neighbourCountryNum) {
  const value = country == "india" ? 1 : 0;

  //data fetching for main country
  const response = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await response.json();

  if (!neighbourCountryNum) {
    renderCountry(data[value], "");
  } else {
    const neighbour = data[value].borders[neighbourCountryNum];

    //data fetching for neighbour
    const responseNeigbhour = await fetch(
      `https://restcountries.com/v2/alpha/${neighbour}`
    );
    const dataNeigbhour = await responseNeigbhour.json();

    renderCountry(data[value], dataNeigbhour, "country neighbour");
  }
}

btn.addEventListener("click", () => {
  getCountryDataPro(inpCounrty.value, inpNeig.value);
});
