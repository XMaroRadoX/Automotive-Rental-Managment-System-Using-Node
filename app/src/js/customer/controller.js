import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "./model.js";
import filterView from "./views/filtersView.js";
import carsView from "./views/carsView.js";

let active, filtered;

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
  await model.getCars();

  carsView.render(model.state.cars, model.state.favourites);
  carsView.handle();
  addFilters();

  document.querySelector(".btn-apply").addEventListener("click", filter.bind());
  document.querySelector(".btn-reset").addEventListener("click", reset.bind());
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.addEventListener("click", navHandler.bind(btn)));

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
    new bootstrap.Tooltip(tooltip);
  });
};

const addFilters = () => {
  model.state.filters.forEach((filter) => {
    filterView.renderFilter(filter);
  });

  filterView.addFiltersHandler();
};

export const filterHandler = function () {
  const type = this.closest(".filter").dataset.filter;
  const value = this.value;

  if (this.checked) {
    model.state.userFilters[type].push(value);
  } else {
    const index = model.state.userFilters[type].indexOf(value);
    model.state.userFilters[type].splice(index, 1);
  }
};

export const regionHandler = function (region) {
  model.state.userFilters["region"] = region;
};

export const seatingHandler = function (seats) {
  model.state.userFilters["seating"] = seats;
};

export const favouriteHandler = function () {
  const btn = this.querySelector(".bi-heart-fill");
  btn.classList.toggle("fav-active");
  const id = this.closest(".card").dataset.carId;

  if (btn.classList.contains("fav-active")) model.addFavorite(id);
  else model.removeFavorite(id);

  if (active === "favourites") {
    carsView.render(model.state.favourites, model.state.favourites);
    carsView.handle();
  }
};

const getActiveData = () => {
  if (active === "favourites") return model.state.favourites;
  if (active === "reserved") return model.state.reserved;
  if (active === "rented") return model.state.rented;
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

  if (!flag) carsView.render(data, model.state.favourites);
  else carsView.render(result, model.state.favourites);
  carsView.handle();
  filtered = true;
};

const reset = function () {
  filterView.reset();

  model.state.userFilters = {
    type: [],
    transmission: [],
    brand: [],
    color: [],
    seating: 1,
    region: "",
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

  carsView.render(getActiveData(), model.state.favourites);
  carsView.handle();
  filtered = false;
};

const navHandler = function (e) {
  e.preventDefault();
  const action = this.dataset.action;
  active = action;

  document.querySelector(".active").classList.remove("active");
  this.classList.add("active");

  if (action === "home")
    carsView.render(model.state.cars, model.state.favourites);

  if (action === "reserved")
    carsView.render(model.state.reserved, model.state.favourites);

  if (action === "rented")
    carsView.render(model.state.rented, model.state.favourites);

  if (action === "favourites")
    carsView.render(model.state.favourites, model.state.favourites);

  carsView.handle();

  if (filtered) filter();
};

init();
