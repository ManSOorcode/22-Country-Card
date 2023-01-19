"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const inpCounrty = document.querySelector(".inp_country");
const inpCounrtyValue = document.querySelector(".inp_country_value");
const inpNeig = document.querySelector(".inp_neighbour");

function renderCountry(data, className = "") {
  const html = ` <article class="country ${className} ">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">REGION ${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(2)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${
          data.currencies[0].name
        } <span> ${data.currencies[0].symbol}</span></p>
      </div>
    </article>`;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
}

/// my own country project

function getCountryDataPro(country, neighbourCountryNum) {
  const value = country == "india" ? 1 : 0;

  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCountry(data[value]);

      //neighbour country
      const neighbour = data[value].borders[neighbourCountryNum];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data2) {
      renderCountry(data2, "neighbour");
    });
}

btn.addEventListener("click", () => {
  getCountryDataPro(inpCounrty.value, inpNeig.value);
});
