import { SERVER_URL } from "./config.js";

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
    powertrain: [],
    seating: 1,
    region: "",
    range: [],
    year: 0,
  },
};

export const getCountries = async () => {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    if (!res.ok) throw new Error();

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

export const adminGetData = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/adminData`);
    if (!res.ok) throw new Error();

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

export const adminRevokeCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error();

    let index = state.cars.findIndex((c) => c.carId === id);

    if (index == -1) return;
    state.cars.splice(index, 1);

    index = state.reserved.findIndex((c) => c.carId === id);
    if (index == -1) return;

    state.reserved[index].status = "active";
    state.cars.push(state.reserved[index]);
    sortCars("all");
    sortCars("reserved");

    return true;
  } catch (e) {
    return false;
  }
};

export const adminReturnCar = async function (id) {
  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error();

    let index = state.cars.findIndex((c) => c.carId === id);
    if (index == -1) return;
    state.cars.splice(index, 1);

    index = state.rented.findIndex((c) => c.carId === id);
    if (index == -1) return;

    state.rented[index].status = "active";
    state.cars.push(state.rented[index]);

    sortCars("all");
    sortCars("rented");

    return true;
  } catch (e) {
    return false;
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
    if (!res.ok) throw new Error();

    const car = state.cars.find((c) => c.carId === id);
    if (!car) return;

    car.status = "oos";

    return true;
  } catch (e) {
    return false;
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
    if (!res.ok) throw new Error();

    const car = state.cars.find((c) => c.carId === id);
    if (!car) return;

    car.status = "active";
    return true;
  } catch (e) {
    return false;
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
    if (!res.ok) throw new Error();

    const index = state.users.findIndex((u) => u.id === +id);
    if (index === -1) return;

    state.users.splice(index, 1);

    console.log(state.users);
    return true;
  } catch (e) {
    return false;
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
    if (!res.ok) throw new Error();

    const data = await res.json();

    state.daily = data.data;
  } catch (e) {
    return false;
  }
};

export const adminGetPayments = async function (period) {
  try {
    const res = await fetch(`${SERVER_URL}/dailyPayments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ period }),
    });
    if (!res.ok) throw new Error();

    const data = await res.json();

    state.payments = data;
  } catch (e) {
    return false;
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
    if (!res.ok) throw new Error();

    await adminGetData();
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/data`);
    const data = await res.json();

    if (!res.ok) throw new Error();

    state.cars = data.cars;
    state.favourites = data.favs;
    state.rented = data.ren;
    state.reserved = data.rev;
    state.filters = data.filters;
    state.userLimit = data.limit;

    sortCars("all");
    sortCars("reserved");
    sortCars("rented");
    sortCars();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const addFavorite = async (id) => {
  try {
    const res = await fetch(`${SERVER_URL}/addFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error();

    let car = state.cars.find((c) => c.carId === id);
    if (!car) car = state.reserved.find((c) => c.carId === id);
    if (!car) car = state.rented.find((c) => c.carId === id);

    state.favourites.push(car);
    sortCars();

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const removeFavorite = async (id) => {
  try {
    const res = await fetch(`${SERVER_URL}/removeFavourite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error();

    const car = state.favourites.findIndex((c) => c.carId === id);
    state.favourites.splice(car, 1);
    sortCars();

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const pickCar = async function (id) {
  const index = state.reserved.findIndex((c) => c.carId === id);
  if (index == -1) return;

  try {
    const res = await fetch(`${SERVER_URL}/pickCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: state.reserved[index].resId, id }),
    });

    if (!res.ok) throw new Error();

    state.reserved[index].status = "rented";
    state.rented.push(state.reserved[index]);
    state.reserved.splice(index, 1);
    sortCars("rented");
    sortCars("reserved");

    return true;
  } catch (e) {
    console.log(e);
  }
};

export const revokeCar = async function (id) {
  const index = state.reserved.findIndex((c) => c.carId === id);
  if (index == -1) return;

  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: state.reserved[index].resId, id }),
    });

    if (!res.ok) throw new Error();

    // clear reserve-info
    state.reserved[index].status = "active";
    state.reserved[index].resId = "";
    state.reserved[index].pickup = "";
    state.reserved[index].drop = "";
    state.reserved[index].date = "";
    state.reserved[index].custId = "";
    state.reserved[index].custName = "";

    state.cars.push(state.reserved[index]);
    state.reserved.splice(index, 1);
    sortCars("all");
    sortCars("reserved");

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const returnCar = async function (id) {
  const index = state.rented.findIndex((c) => c.carId === id);
  if (index == -1) return;
  const date = new Date();

  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: state.rented[index].resId,
        id,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      }),
    });

    if (!res.ok) throw new Error();

    state.rented[index].status = "active";
    state.rented[index].resId = "";
    state.rented[index].pickup = "";
    state.rented[index].drop = "";
    state.rented[index].date = "";
    state.rented[index].custId = "";
    state.rented[index].custName = "";

    state.cars.push(state.rented[index]);
    console.log(state.cars);
    state.rented.splice(index, 1);

    sortCars("all");
    sortCars("rented");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const reserveCar = async function (data, flag) {
  const index = state.cars.findIndex((c) => c.carId === data.carId);
  if (index == -1) return;

  const favIndex = state.favourites.findIndex((c) => c.carId === data.carId);
  const date = new Date();

  data.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  try {
    const res = await fetch(`${SERVER_URL}/reserveCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });

    if (!res.ok) throw new Error();

    const resId = await res.json();

    state.cars[index].status = "reserved";
    state.cars[index].pickup = data.pick_date;
    state.cars[index].drop = data.drop_date;
    state.cars[index].pickLocation = data.pick_place;
    state.cars[index].dropLocation = data.drop_place;
    state.cars[index].date = data.date;
    state.cars[index].resId = resId;

    state.reserved.push(state.cars[index]);

    sortCars("all");
    sortCars("reserved");

    if (flag && favIndex > -1) {
      state.favourites.splice(favIndex, 1);
      state.favourites.push(state.cars[index]);
      sortCars();
    }

    state.cars.splice(index, 1);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPayments = async function () {
  try {
    const res = await fetch(`${SERVER_URL}/payments`);
    if (!res.ok) throw new Error();

    const data = await res.json();
    state.payments = data;
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const makePayment = async function (order, car, method) {
  try {
    const res = await fetch(`${SERVER_URL}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order, car, method }),
    });
    if (!res.ok) throw new Error();

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const signIn = async function (data) {
  try {
    const res = await fetch(`${SERVER_URL}/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    return true;
  } catch (e) {
    return false;
  }
};

export const register = async function (data) {
  try {
    const res = await fetch(`${SERVER_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    return true;
  } catch (e) {
    return false;
  }
};

export const signOut = async function () {
  try {
    const res = await fetch(`${SERVER_URL}/signOut`, {
      method: "POST",
    });
    if (!res.ok) throw new Error();
    window.location = `${SERVER_URL}/`;

    return true;
  } catch (e) {
    return false;
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
