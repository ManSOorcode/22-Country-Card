"use strict";

const btn = document.querySelector(".btn-country");
const newContainer = document.querySelector(".container");

const inpCounrty = document.querySelector(".inp_country");
const inpCounrtyValue = document.querySelector(".inp_country_value");
const inpNeig = document.querySelector(".inp_neighbour");

function renderCountry(data, data2, className = "") {
  const html1 = `
                  <article class="country">
                      <img class="country__img" src="${data.flag}" />
                      <div class="country__data">
                        <h3 class="country__name">${data.name}</h3>
                        <h4 class="country__region">REGION ${data.region}</h4>
                        <p class="country__row"><span>👫</span>${(
                          +data.population / 1000000
                        ).toFixed(2)} people</p>
                        <p class="country__row"><span>🗣️</span>${
                          data.languages[0].name
                        }</p>
                        <p class="country__row"><span>💰</span>${
                          data.currencies[0].name
                        } <span> ${data.currencies[0].symbol}</span></p>
                      </div>
                  </article>          
    `;

  const html2 = ` <article class="${className}">
                      <img class="country__img" src="${data2?.flag}" />
                      <div class="country__data">
                        <h3 class="country__name">${data2?.name}</h3>
                        <h4 class="country__region">REGION ${data2?.region}</h4>
                        <p class="country__row"><span>👫</span>${(
                          +data2?.population / 1000000
                        ).toFixed(2)} people</p>
                        <p class="country__row"><span>🗣️</span>${
                          data2?.languages[0]?.name
                        }</p>
                        <p class="country__row"><span>💰</span>${
                          data2?.currencies[0]?.name
                        } <span> ${data2?.currencies[0].symbol}</span></p>
                      </div>
                  </article> `;

  const findEle = html2.split(" ").some((el) => el.includes("undefined"));

  const countriesContainer = document.createElement("div");
  countriesContainer.setAttribute("class", "countries");

  if (!findEle) {
    countriesContainer.insertAdjacentHTML("beforeend", html1);
    countriesContainer.insertAdjacentHTML("beforeend", html2);
  } else {
    countriesContainer.insertAdjacentHTML("beforeend", html1);
  }

  newContainer.append(countriesContainer);

  countriesContainer.style.opacity = 1;
}

/// my own country project
async function getCountryDataPro(country, neighbourCountryNum) {
  const value = country == "india" ? 1 : 0;

  //data fetching for main country
  const response = await fetch(`https://restcountries.com/v2/name/${country}`);
  const data = await response.json();

  console.log(data);
  if (
    data[value].borders === undefined ||
    data[value].borders[neighbourCountryNum] === undefined
  ) {
    console.log("doest not have neighbour");
    renderCountry(data[value]);
  }

  if (!neighbourCountryNum) {
    return renderCountry(data[value]);
  } else {
    const neighbour = data[value].borders[neighbourCountryNum];

    //data fetching for neighbour
    const responseNeigbhour = await fetch(
      `https://restcountries.com/v2/alpha/${neighbour}`
    );
    const dataNeigbhour = await responseNeigbhour.json();

    return renderCountry(data[value], dataNeigbhour, "country neighbour");
  }
}

btn.addEventListener("click", () => {
  getCountryDataPro(inpCounrty.value, inpNeig.value);
});
