"use strict";

import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "../model.js";
import filterView from "../filtersView.js";
import carsView from "./views/carsView.js";
import { SERVER_URL } from "../config.js";

const container = document.querySelector(".app-container");
const payContainer = document.querySelector(".payment-container");
const info = document.querySelector("#car-info");
const alert = document.querySelector(".alert");
let confirm;

let filtered, activeCar;

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
  await model.getData();

  carsView.render(model.state.cars, model.state.favourites);
  carsView.handle();
  addFilters();

  document.querySelector(".btn-apply").addEventListener("click", filter.bind());
  document.querySelector(".btn-reset").addEventListener("click", reset.bind());
  document
    .querySelector(".btn-join")
    .addEventListener(
      "click",
      () => (window.location = `${SERVER_URL}/createAccount`)
    );

  document
    .querySelector(".btn-singIn")
    .addEventListener("click", () => (window.location = `${SERVER_URL}/logIn`));
  handleView();
};

const showAlert = function (message, flag = true) {
  alert.textContent = message;
  alert.classList.toggle("alert-hide");
  alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);

  setTimeout(() => {
    alert.classList.toggle("alert-hide");
    alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);
    alert.textContent = "";
  }, 3000);
};

const handleView = function () {
  document.querySelectorAll(".btn-view").forEach((btn) => {
    const id = btn.closest(".card").dataset.carId;

    btn.addEventListener("click", () => {
      carsView.setModal();

      activeCar = getActiveData().filter((c) => c.carId === id)[0];

      carsView.renderCarView(activeCar);

      document
        .querySelector(".btn-reserve")
        .addEventListener("click", async () => {
          let brand = activeCar.brand;
          brand = brand
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        });
    });
  });
};

const addFilters = () => {
  model.state.filters.forEach((filter) => {
    filterView.renderFilter(filter);
  });

  filterView.addFiltersHandler();
};

const getActiveData = () => {
  return model.state.cars;
};

const filter = function () {
  let result = [];
  let flag = false;
  const data = getActiveData();

  Object.entries(model.state.userFilters).forEach((filter) => {
    const queryRes = [];
    if (filter[0] === "seating" && filter[1] > 1) {
      queryRes.push(...data.filter((car) => car.seating === filter[1]));

      if (flag) result = result.filter((value) => queryRes.includes(value));
      else result.push(...queryRes);

      flag = true;
      return;
    }

    if (filter[0] === "region" && filter[1] && filter[1] != "-") {
      queryRes.push(
        ...data.filter((car) => car.cca2 === filter[1].toLowerCase())
      );

      if (flag) result = result.filter((value) => queryRes.includes(value));
      else result.push(...queryRes);

      flag = true;
      return;
    }

    if (filter[0] === "range" && filter[1].length > 0) {
      const min = filter[1][0];
      const max = filter[1][1];

      queryRes.push(
        ...data.filter((car) => +car.rate >= min && +car.rate <= max)
      );

      if (filter[0] === "year" && filter[1] > 0) {
        queryRes.push(...data.filter((car) => car.year === filter[1]));

        if (flag) result = result.filter((value) => queryRes.includes(value));
        else result.push(...queryRes);

        flag = true;
        return;
      }

      if (flag) result = result.filter((value) => queryRes.includes(value));
      else result.push(...queryRes);

      flag = true;
      return;
    }

    const opts = filter[1];
    if (opts.length > 0) {
      opts.forEach((opt) => {
        queryRes.push(...data.filter((car) => car[filter[0]] === opt));
      });

      if (flag) result = result.filter((value) => queryRes.includes(value));
      else result.push(...queryRes);

      flag = true;
    }
  });

  if (!flag) carsView.render(data);
  else carsView.render(result);
  carsView.handle();
  handleView();
  if (result.length > 0) showAlert("Showing filter results");
  else showAlert("No data found", false);

  filtered = true;
};

const reset = function () {
  filterView.reset();

  model.state.userFilters = {
    type: [],
    transmission: [],
    brand: [],
    powertrain: [],
    color: [],
    seating: 1,
    region: "",
    range: [],
    year: 0,
  };

  document.querySelectorAll(".open").forEach((btn) => {
    btn.closest(".btn-filter").ariaExpanded = false;
    btn.closest(".filter").querySelector(".show").classList.remove("show");
    btn.classList.remove("open");
    btn
      .closest(".btn-filter")
      .querySelector(".rotate")
      .classList.remove("rotate");
  });

  renderState();
  handleView();

  filtered = false;
};

const renderState = function () {
  carsView.clearModal();
  carsView.render(getActiveData());
  carsView.handle();
  handleView();

  if (filtered) filter();
};

document.querySelector("footer").innerHTML = `
      Copyrights &copy; ${new Date().getFullYear()} Amr Yasser, Marwan Khaled, and Begad Wael
`;

init();
