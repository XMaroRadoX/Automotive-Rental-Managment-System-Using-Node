"use strict";

import * as model from "./model.js";

export const filterHandler = function () {
  const type = this.closest(".filter").dataset.filter;
  const value = this.value;

  if (this.checked) {
    model.state.userFilters[type]?.push(value);
  } else {
    const index = model.state.userFilters[type]?.indexOf(value);
    model.state.userFilters[type]?.splice(index, 1);
  }
};

export const regionHandler = function (region) {
  model.state.userFilters["region"] = region;
};

export const seatingHandler = function (seats) {
  model.state.userFilters["seating"] = seats;
};

export const pricingHandler = function (min, max) {
  if ((!min && !max) || min > max) {
    model.state.userFilters.range = [];
    return;
  }
  if (!min) min = 0;
  if (!max) max = 8000;
  model.state.userFilters.range = [min, max];
};

export const yearHandler = function (year) {
  if (!year) {
    model.state.userFilters.year = 0;
    return;
  }
  model.state.userFilters.year = year;
};
