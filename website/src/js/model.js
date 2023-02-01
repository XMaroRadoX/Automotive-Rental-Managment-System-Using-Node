import { SERVER_URL } from "./config.js";

export const state = {
  cars: [],
  reserved: [],
  rented: [],
  filters: [],
  users: [],
  daily: [],
  payments: [],
  reservations: [],
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

    const reservations = data.reservations;
    state.cars = [
      ...data.cars.filter(
        (c) =>
          !data.reservations.some(
            (car) => car.car_id === c.car_id && car.res_status === "active"
          )
      ),
      ...data.reservations.filter((c) => c.res_status === "active"),
    ];

    state.users = data.users;

    state.reservations = data.reservations;
    state.reserved = reservations.filter((c) => c.status === "reserved");
    state.rented = reservations.filter((c) => c.status === "rented");
    state.filters = data.filters;

    sortCars("all");
    sortCars("reserved");
    sortCars("rented");
  } catch (e) {
    console.error(e);
  }
};

export const adminRevokeCar = async function (id, order) {
  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, order }),
    });
    if (!res.ok) throw new Error();

    let index = state.cars.findIndex((c) => c.car_id === id);

    if (index == -1) return false;
    state.cars.splice(index, 1);

    index = state.reservations.findIndex((c) => c.res_id === order);
    if (index == -1) return false;

    state.reservations[index].status = "active";
    state.reservations[index].res_status = "revoked";

    state.cars.push(state.reservations[index]);

    index = state.reserved.findIndex((c) => c.car_id === id);
    if (index == -1) return false;

    state.reserved[index].status = "active";

    sortCars("all");
    sortCars("reserved");

    return true;
  } catch (e) {
    return false;
  }
};

export const adminReturnCar = async function (id, order, cust) {
  const d = new Date();
  const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, order, cust, date }),
    });
    if (!res.ok) throw new Error();

    let index = state.cars.findIndex((c) => c.car_id === id);

    if (index == -1) return false;
    state.cars.splice(index, 1);

    index = state.reservations.findIndex((c) => c.res_id === order);
    if (index == -1) return false;

    state.reservations[index].status = "active";
    state.reservations[index].res_status = "returned";

    state.cars.push(state.reservations[index]);

    index = state.rented.findIndex((c) => c.car_id === id);
    if (index == -1) return false;

    state.rented[index].status = "active";

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

    const car = state.cars.find((c) => c.car_id === id);
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

    const car = state.cars.find((c) => c.car_id === id);
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

    const index = state.users.findIndex((u) => u.customer_id === id);
    if (index === -1) return;

    state.users.splice(index, 1);

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

    if (data[0].date !== null) state.payments = data;
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

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    await adminGetData();
    return true;
  } catch (e) {
    return false;
  }
};

export const getData = async () => {
  try {
    const res = await fetch(`${SERVER_URL}/data`);
    const resData = await res.json();
    const data = resData.data;
    const name = resData.name;

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    state.cars = data.cars;
    state.favourites = data.favs;
    state.rented = data.reservations.filter((c) => c.status === "rented");
    state.reserved = data.reservations.filter((c) => c.status === "reserved");
    state.filters = data.filters;

    sortCars("all");
    sortCars("reserved");
    sortCars("rented");
    sortCars();
    return name;
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

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    let car = state.cars.find((c) => c.car_id === id);
    if (!car) car = state.reserved.find((c) => c.car_id === id);
    if (!car) car = state.rented.find((c) => c.car_id === id);
    if (!car) throw new Error("Cannot find car");

    state.favourites.push(car);
    sortCars();

    return [true, "Car added to favorites successfully"];
  } catch (e) {
    return [false, e.message];
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

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    const car = state.favourites.findIndex((c) => c.car_id === id);
    if (car === -1) throw new Error("Cannot find car");
    state.favourites.splice(car, 1);
    sortCars();

    return [true, "Car removed from favorites successfully"];
  } catch (e) {
    return [false, e.message];
  }
};

export const pickCar = async function (id) {
  const index = state.reserved.findIndex((c) => c.car_id === id);
  if (index == -1) return [false, "Cannot find car"];

  const pickDate = new Date(state.reserved[index].pick_date);
  const today = new Date();

  if (today.getTime() < pickDate.getTime())
    return [false, "Cannot pick-up car before pick-up date"];

  try {
    const res = await fetch(`${SERVER_URL}/pickCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    state.reserved[index].status = "rented";
    state.rented.push(state.reserved[index]);

    const favIndex = state.favourites.findIndex((c) => c.car_id === id);

    if (favIndex > -1) {
      state.favourites.splice(favIndex, 1);
      state.favourites.push(state.reserved[index]);
      sortCars();
    }

    state.reserved.splice(index, 1);
    sortCars("rented");
    sortCars("reserved");

    return [true, "Car picked successfully"];
  } catch (e) {
    return [false, e.message];
  }
};

export const revokeCar = async function (id, order) {
  const index = state.reserved.findIndex((c) => c.car_id === id);
  if (index == -1) return [false, "Cannot find car"];

  try {
    const res = await fetch(`${SERVER_URL}/revokeCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order, id }),
    });

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    // clear reserve-info
    state.reserved[index].status = "active";
    state.reserved[index].res_id = "";
    state.reserved[index].pick_date = "";
    state.reserved[index].drop_date = "";
    state.reserved[index].date = "";
    state.reserved[index].customer_Id = "";
    state.reserved[index].pick_place = "";
    state.reserved[index].drop_place = "";

    state.cars.push(state.reserved[index]);

    const favIndex = state.favourites.findIndex((c) => c.car_id === id);

    if (favIndex > -1) {
      state.favourites.splice(favIndex, 1);
      state.favourites.push(state.reserved[index]);
      sortCars();
    }

    state.reserved.splice(index, 1);
    sortCars("all");
    sortCars("reserved");

    return [true, "Car revoked successfully"];
  } catch (e) {
    return [false, e.message];
  }
};

export const returnCar = async function (id, order) {
  const index = state.rented.findIndex((c) => c.car_id === id);
  if (index == -1) return [false, "Cannot find car"];
  const date = new Date();

  try {
    const res = await fetch(`${SERVER_URL}/returnCar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order,
        id,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      }),
    });

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    state.rented[index].status = "active";
    state.rented[index].res_id = "";
    state.rented[index].pick_date = "";
    state.rented[index].drop_date = "";
    state.rented[index].date = "";
    state.rented[index].customer_Id = "";
    state.rented[index].pick_place = "";
    state.rented[index].drop_place = "";

    state.cars.push(state.rented[index]);

    const favIndex = state.favourites.findIndex((c) => c.car_id === id);

    if (favIndex > -1) {
      state.favourites.splice(favIndex, 1);
      state.favourites.push(state.rented[index]);
      sortCars();
    }

    state.rented.splice(index, 1);

    sortCars("all");
    sortCars("rented");
    return [true, "Car returned successfully"];
  } catch (e) {
    return [false, e.message];
  }
};

export const reserveCar = async function (data, flag) {
  const index = state.cars.findIndex((c) => c.car_id === data.car_id);
  if (index == -1) return [false, "Cannot find car"];

  const period = Math.ceil(
    Math.abs(new Date(data.drop_date) - new Date(data.pick_date)) /
      (1000 * 60 * 60 * 24)
  );

  if (period < 0 || period > 45)
    return [false, "Period must be between 1 and 30 days"];

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

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    const resId = await res.json();

    state.cars[index].status = "reserved";
    state.cars[index].pick_date = data.pick_date;
    state.cars[index].drop_date = data.drop_date;
    state.cars[index].pick_place = data.pick_place;
    state.cars[index].drop_place = data.drop_place;
    state.cars[index].date = data.date;
    state.cars[index].res_id = resId;

    state.reserved.push(state.cars[index]);

    sortCars("all");
    sortCars("reserved");

    const favIndex = state.favourites.findIndex(
      (c) => c.car_id === data.car_id
    );

    if (favIndex > -1) {
      state.favourites.splice(favIndex, 1);
      state.favourites.push(state.cars[index]);
      sortCars();
    }

    state.cars.splice(index, 1);

    return [true, "Car reserved successfully"];
  } catch (e) {
    return [false, e.message];
  }
};

export const getPayments = async function () {
  try {
    const res = await fetch(`${SERVER_URL}/payments`);

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    const data = await res.json();
    state.payments = data;

    return true;
  } catch (e) {
    return false;
  }
};

export const makePayment = async function (order, id, method) {
  try {
    const res = await fetch(`${SERVER_URL}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order, id, method }),
    });

    if (!res.ok) {
      const mes = await res.text();
      throw new Error(mes);
    }

    return [true, "Payment made successfully"];
  } catch (e) {
    return [false, e.message];
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
