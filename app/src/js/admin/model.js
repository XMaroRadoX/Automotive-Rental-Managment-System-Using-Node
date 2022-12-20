import { SERVER_URL } from "../config.js";

export const state = {
  cars: [],
  reserved: [],
  rented: [],
  filters: [],
  users: [],
  daily: [],
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

export const getData = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/admin`);
    const data = await res.json();

    state.cars = data.cars;
    state.users = data.users;
    state.rented = data.ren;
    state.reserved = data.rev;
    state.filters = data.filters;

    sortCars("all");
    sortCars("reserved");
    sortCars("rented");
  } catch (e) {
    console.error(e);
  }
};

export const revokeCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    let index = state.cars.findIndex((c) => c.carId === id);

    if (index == -1) return;
    state.cars.splice(index, 1);

    index = state.reserved.findIndex((c) => c.carId === id);
    if (index == -1) return;

    state.reserved[index].status = "active";
    state.cars.push(state.reserved[index]);
    sortCars("all");
    sortCars("reserved");

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const returnCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    let index = state.cars.findIndex((c) => c.carId === id);
    if (index == -1) return;
    state.cars.splice(index, 1);

    index = state.rented.findIndex((c) => c.carId === id);
    if (index == -1) return;

    state.rented[index].status = "active";
    state.cars.push(state.rented[index]);

    sortCars("all");
    sortCars("rented");

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const suspendCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/suspendCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const car = state.cars.find((c) => c.carId === id);
    if (!car) return;

    car.status = "oos";

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const activateCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/activateCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const car = state.cars.find((c) => c.carId === id);
    if (!car) return;

    car.status = "active";
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const deleteCustomer = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/deleteCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const index = state.users.findIndex((u) => u.id === +id);
    if (index === -1) return;

    state.users.splice(index, 1);

    console.log(state.users);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const getStatus = async function (date) {
  try {
    const res = await fetch(`${SERVER_URL}/daily`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    const data = await res.json();

    state.daily = data.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPayments = async function (period) {
  try {
    const res = await fetch(`${SERVER_URL}/dailyPayments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period }),
    });

    const data = await res.json();

    state.payments = data;
  } catch (e) {
    console.log(e);
  }
};

export const addCar = async function (data) {
  try {
    const res = await fetch(`${SERVER_URL}/addCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await getData();
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
};
