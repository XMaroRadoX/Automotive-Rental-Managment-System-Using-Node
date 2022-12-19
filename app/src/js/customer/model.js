import { SERVER_URL } from "../config.js";

export const state = {
  cars: [],
  favourites: [],
  reserved: [],
  rented: [],
  filters: [],
  payments: [],
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
    const res = await fetch(`${SERVER_URL}/cars`);
    const data = await res.json();

    state.cars = data.cars;
    state.favourites = data.favs;
    state.rented = data.ren;
    state.reserved = data.rev;
    state.filters = data.filters;

    sortCars("all");
    sortCars("reserved");
    sortCars("rented");
    sortCars();
  } catch (e) {
    console.error(e);
  }
};

export const addFavorite = async (id) => {
  let car = state.cars.find((c) => c.id === id);
  if (!car) car = state.reserved.find((c) => c.id === id);
  if (!car) car = state.rented.find((c) => c.id === id);

  state.favourites.push(car);
  sortCars();

  try {
    const res = await fetch(`${SERVER_URL}/addFavourite`, {
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
  sortCars();

  try {
    const res = await fetch(`${SERVER_URL}/removeFavourite`, {
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

export const pickCar = async function (id) {
  const index = state.reserved.findIndex((c) => c.id === id);
  if (index == -1) return;
  state.reserved[index].status = "rented";
  state.rented.push(state.reserved[index]);
  state.reserved.splice(index, 1);
  sortCars("rented");
  sortCars("reserved");

  try {
    const res = await fetch(`${SERVER_URL}/pickCar`, {
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

export const revokeCar = async function (id) {
  const index = state.reserved.findIndex((c) => c.id === id);
  if (index == -1) return;

  state.reserved[index].status = "active";
  state.cars.push(state.reserved[index]);
  state.reserved.splice(index, 1);
  sortCars("all");
  sortCars("reserved");

  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
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

export const reserveCar = async function (data) {
  const index = state.cars.findIndex((c) => c.id === data.id);
  if (index == -1) return;
  state.cars[index].status = "reserved";
  state.reserved.push(state.cars[index]);
  state.cars.splice(index, 1);
  sortCars("all");
  sortCars("reserved");

  try {
    const res = await fetch(`${SERVER_URL}/reserveCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const returnCar = async function (id) {
  const index = state.rented.findIndex((c) => c.id === id);
  if (index == -1) return;
  state.rented[index].status = "active";
  state.cars.push(state.rented[index]);
  state.rented.splice(index, 1);

  sortCars("all");
  sortCars("rented");

  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
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

export const getPayments = async function () {
  try {
    const res = await fetch(`${SERVER_URL}/payments`);
    const data = await res.json();

    state.payments = data;
    console.log(data);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const makePayment = async function (id, method) {
  const index = state.payments.findIndex((p) => p.orderId === id);
  if (index == -1) return;

  try {
    const res = await fetch(`${SERVER_URL}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, method }),
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const signout = async function () {
  try {
    const res = await fetch(`${SERVER_URL}/signout`, {
      method: "POST",
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const sortCars = function (data) {
  if (data === "all")
    state.cars && state.cars.sort((a, b) => a.brand.localeCompare(b.brand));

  if ((data = "reserved"))
    state.reserved &&
      state.reserved.sort((a, b) => a.brand.localeCompare(b.brand));

  if ((data = "rented"))
    state.rented && state.rented.sort((a, b) => a.brand.localeCompare(b.brand));

  state.favourites &&
    state.favourites.sort((a, b) => a.brand.localeCompare(b.brand));
};
