import { SERVER_PORT } from "../config.js";

export const state = {
  cars: [],
  favourites: [],
  reserved: [],
  rented: [],
  filters: [],
  userFilters: {
    type: [],
    transmission: [],
    brand: [],
    color: [],
    seating: 1,
    region: "",
  },
};

export const getCountries = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);

    const data = await res.json();

    const countries = [];

    data.forEach((cont) => {
      if (cont.name.common !== "Israel")
        countries.push({
          name: cont.name.common,
          cca2: cont.cca2,
          cca3: cont.cca3,
        });
    });

    countries.sort((a, b) => a.name.localeCompare(b.name));

    return countries;
  } catch (err) {
    console.error(err);
  }
};

export const getCars = async () => {
  try {
    const res = await fetch(`http://localhost:${SERVER_PORT}/cars`);
    const data = await res.json();

    state.cars = data.cars;
    state.favourites = data.favs;
    state.rented = data.ren;
    state.reserved = data.rev;
    state.filters = data.filters;

    state.cars && state.cars.sort((a, b) => a.brand.localeCompare(b.brand));
    state.favourites &&
      state.favourites.sort((a, b) => a.brand.localeCompare(b.brand));
    state.reserved &&
      state.reserved.sort((a, b) => a.brand.localeCompare(b.brand));
    state.rented && state.rented.sort((a, b) => a.brand.localeCompare(b.brand));
  } catch (e) {
    console.error(e);
  }
};

export const addFavorite = async (id) => {
  const car = state.cars.find((c) => c.id === id);
  state.favourites.push(car);

  try {
    const res = await fetch(`http://localhost:${SERVER_PORT}/addFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const removeFavorite = async (id) => {
  const car = state.favourites.findIndex((c) => c.id === id);
  state.favourites.splice(car, 1);

  try {
    const res = await fetch(`http://localhost:${SERVER_PORT}/removeFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
