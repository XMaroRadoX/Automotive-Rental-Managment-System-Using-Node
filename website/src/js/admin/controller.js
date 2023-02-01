"use strict";

import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "../model.js";
import filterView from "../filtersView.js";
import tableView from "./views/tableView.js";
import searchView from "./views/searchView.js";
import {
  CUSTOMER_HEAD,
  CAR_HEAD,
  RESERVATIONS_HEAD,
  STATUS_HEAD,
  PAYMENTS_HEAD,
} from "../config.js";

let active = "cars",
  filtered,
  activeSearch,
  activeCat = "all",
  activeCar,
  inputs;
let filterBtns, searched;
let formData;

const info = document.querySelector("#car-info");
const alert = document.querySelector(".alert");
let confirm;

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
  await model.adminGetData();

  tableView.render(model.state.cars, CAR_HEAD, active);

  addFilters();

  document.querySelector(".btn-apply").addEventListener("click", filter.bind());
  document.querySelector(".btn-reset").addEventListener("click", reset.bind());

  filterBtns = document
    .querySelector(".sidebar-container")
    .querySelectorAll("button");

  document
    .querySelectorAll(".btn-nav")
    .forEach((btn) => btn.addEventListener("click", navHandler.bind(btn)));

  document
    .querySelector(".btn-signout")
    .addEventListener("click", model.signOut.bind(null));

  document.querySelector("#close-confirm").addEventListener("click", () => {
    $("#confirm-modal").modal("toggle");
  });

  handleSearch();
  handleCars();
  handleView();
};

const handleView = function () {
  document.querySelectorAll(".btn-view").forEach((btn) => {
    const id = btn.dataset.carId;
    const order = btn.dataset.resId;
    const cust = btn.dataset.custId;

    btn.addEventListener("click", () => {
      if (
        active === "reservations" ||
        activeCat === "reserved" ||
        activeCat === "rented"
      ) {
        activeCar = getActiveData().find(
          (c) => c.car_id === id && c.res_id === order
        );
        tableView.renderCarView(activeCar, active);
      } else {
        activeCar = getActiveData().find((c) => c.car_id === id);
        tableView.renderCarView(activeCar, active);
      }

      if (active === "cars" || active === "reservations") {
        let btn = document.querySelector(".btn-return");
        if (btn) {
          btn.addEventListener(
            "click",
            returnHandler.bind(null, id, order, cust)
          );
        }

        btn = document.querySelector(".btn-revoke");
        if (btn) {
          btn.addEventListener("click", revokeHandler.bind(null, id, order));
        }

        btn = document.querySelector(".btn-suspend");
        if (btn) {
          btn.addEventListener("click", suspendHandler.bind(null, id));
        }

        btn = document.querySelector(".btn-activate");
        if (btn) {
          btn.addEventListener("click", activateHandler.bind(null, id));
        }
      }
    });
  });
};

const handleCustomer = function () {
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    const id = btn.dataset.customerId;

    btn.addEventListener("click", deleteHandler.bind(null, id));
  });

  inputs = document.querySelector(".customer-filter").querySelectorAll("input");
};

const handleRange = function () {
  $(function () {
    $('input[name="daterange"]').daterangepicker(
      {
        opens: "left",
      },
      function (start, end, label) {}
    );
  });
};

const handleReservations = function () {
  inputs = document
    .querySelector(".reservations-filter")
    .querySelectorAll("input");

  handleRange();
};

const handleCars = function () {
  inputs = document.querySelector(".car-search").querySelectorAll("input");
};

const addFilters = () => {
  model.state.filters.forEach((filter) => {
    filterView.renderFilter(filter);
  });

  filterView.addFiltersHandler();
};

const getActiveData = () => {
  if (
    (filtered && active === "reservations") ||
    (searched && active === "reservations")
  )
    return activeSearch;

  if (active === "cars") {
    if (searched) return activeSearch;
    if (activeCat === "all") return model.state.cars;
    if (activeCat === "reserved")
      return model.state.reserved.filter((c) => c.status === "reserved");
    if (activeCat === "oos")
      return model.state.cars.filter((c) => c.status === "oos");

    return model.state.rented.filter((c) => c.status === "rented");
  }

  if (active === "customers") return model.state.users;

  if (active === "reservations") return model.state.reservations;

  if (active === "status") return model.state.daily;

  if (active === "payments") return model.state.payments;
};

const filter = function () {
  filtered = false;

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
        ...data.filter((car) => car.cca2 === filter[1].toUpperCase())
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

      if (flag) result = result.filter((value) => queryRes.includes(value));
      else result.push(...queryRes);

      flag = true;
      return;
    }

    if (filter[0] === "year" && filter[1] > 0) {
      queryRes.push(...data.filter((car) => car.year === filter[1]));

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

      activeSearch = result;
      flag = true;
    }
  });

  let head;
  if (active === "cars") head = CAR_HEAD;
  else if (active === "status") head = STATUS_HEAD;
  else head = RESERVATIONS_HEAD;

  if (!flag) tableView.render(data, head, active);
  else tableView.render(result, head, active);
  handleView();
  if (result.length > 0) showAlert("Showing filter results");
  else showAlert("No data found", false);

  filtered = true;
};

const reset = function () {
  filterView.reset();
  filtered = false;

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
};

const search = function (head) {
  searched = false;
  const query = [...inputs]
    .map((input) => {
      if (input.value) return { name: input.id, value: input.value };
    })
    .filter((p) => p);

  const i = query.findIndex((q) => q.name === "range");
  if (i > -1) {
    const r1 = query[i].value.split("-")[0].trim();
    const r2 = query[i].value.split("-")[1].trim();
    if (r1 === r2) query.splice(i, 1);
  }

  if (!query.length) {
    renderState();
    return;
  }

  const res = [];

  getActiveData()?.forEach((u) => {
    let flag = true;
    if (u.pick_date) {
      u.pick_date = u.pick_date.split("T")[0];
      u.drop_date = u.drop_date.split("T")[0];
      u.date = u.date.split("T")[0];
    }

    query.forEach((q) => {
      if (q.name === "range") {
        const [m1, d1, y1] = q.value.split("-")[0].trim().split("/");

        const [m2, d2, y2] = q.value.split("-")[1].trim().split("/");

        const r1 = Date.parse(`${y1}-${m1}-${d1}`);
        const r2 = Date.parse(`${y2}-${m2}-${d2}`);
        const d = Date.parse(u["date"].split("T")[0]);

        if (d > r2 || d < r1) flag = false;
      } else if (`${u[q.name]}`.toLowerCase() !== `${q.value}`.toLowerCase())
        flag = false;
    });

    if (flag) res.push(u);
  });

  tableView.render(res, head, active);
  handleView();
  active === "customers" && handleCustomer();
  activeSearch = res;
  if (res.length > 0) showAlert("Showing search results");
  else showAlert("No data found", false);

  searched = true;
};

const clearSearch = function () {
  searched = false;
  [...inputs].forEach((i) => (i.value = ""));

  document.querySelector(".btn-clear-search").blur();
  renderState();
};

const renderState = function (data) {
  if (active === "cars") {
    tableView.render(getActiveData(), CAR_HEAD, active);
    handleCars();
    handleView();
    if (filtered) filter(CAR_HEAD);

    if (searched) search();
  }

  if (active === "customers") {
    tableView.render(getActiveData(), CUSTOMER_HEAD, active);
    handleCustomer();

    if (searched) search();
  }

  if (active === "reservations") {
    tableView.render(getActiveData(), RESERVATIONS_HEAD, active);
    handleReservations();
    handleView();

    if (searched) search(RESERVATIONS_HEAD);
    if (filtered) filter(RESERVATIONS_HEAD);
  }

  if (active === "status") {
    tableView.render(getActiveData(), STATUS_HEAD, active);
    handleView();
  }

  if (active === "payments") {
    tableView.render(getActiveData(), PAYMENTS_HEAD, active);
    handleRange();
  }

  if (active === "add") {
    tableView.renderForm();
    handleForm();
  }
};

const handleForm = function () {
  const form = document.querySelector(".car-form");

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      form.classList.add("was-validated");

      if (!form.checkValidity()) {
        return;
      }

      formData = new FormData(form);

      const car = {};

      [...formData.entries()].forEach((entry) => (car[entry[0]] = entry[1]));

      const res = await model.addCar(car);
      if (res) {
        showAlert("Car added successfully");
        await model.adminGetData();
        const countries = await model.getCountries();
        filterView.initUI(countries);
        addFilters();
        active = "cars";
        tableView.toggle();
        searchView.toggle();
        toggleFilters();
        toggleActive.call(document.querySelector(`[data-action = "cars"]`));
        handleSearch();
        renderState();
        return;
      }

      showAlert("Car addition failed", false);
    },
    false
  );
};

const showConfirmation = function (title, message, action) {
  const modal = document.querySelector("#confirm-modal");
  modal.querySelector(".modal-title").textContent = title;
  modal.querySelector(".modal-body").textContent = message;
  document.querySelector(".confirm").innerHTML = "";
  document.querySelector(".confirm").insertAdjacentHTML(
    "afterbegin",
    ` <button
              type="button"
              id="cancel"
              class="btn btn-outline-primary cancel"
              data-bs-dismiss="modal"
              data-action=""
            >
              Cancel
            </button>
            <button
              type="button"
              id="confirm"
              class="btn btn-primary"
              data-action=""
              data-bs-dismiss="modal"
            >
              Save changes
            </button>`
  );

  document.querySelector("#confirm").textContent = action;

  confirm = new Promise((resolve, reject) => {
    document.querySelector("#confirm").addEventListener("click", resolve);
    document.querySelector("#cancel").addEventListener("click", reject);
    document.querySelector("#close-confirm").addEventListener("click", reject);
  });

  $("#confirm-modal").modal("show");
};

const showAlert = async function (message, flag = true) {
  alert.textContent = message;
  alert.classList.toggle("alert-hide");
  alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);

  setTimeout(() => {
    alert.classList.toggle("alert-hide");
    alert.classList.toggle(`${flag ? "alert-success" : "alert-danger"}`);
    alert.textContent = "";
  }, 3000);
};

const navHandler = function (e) {
  e.preventDefault();

  clearSearch();
  const action = this.dataset.action;

  if (action === "add" && active === "add") return;

  (active === "customers" || active === "payments") && toggleFilters();

  if (active === "add" || action === "add") {
    tableView.toggle();
    searchView.toggle();
    toggleFilters();
  }

  active = action;

  toggleActive.call(this);

  handleSearch();

  renderState();
};

const toggleFilters = function () {
  filterBtns.forEach((btn) => {
    btn.disabled = !btn.disabled;

    if (btn.dataset.bsToggle) {
      btn.dataset.bsToggle = "";
    } else {
      btn.dataset.bsToggle = "collapse";
    }
  });
  reset();
};

export const changeCat = function () {
  activeCat = this.id;
  renderState();
};

const handleSearch = function () {
  if (active === "cars") {
    activeCat = "all";
    searchView.renderCarSearch();
    document
      .querySelector(".btn-search")
      .addEventListener("click", search.bind(null, CAR_HEAD));

    document
      .querySelector(".btn-clear-search")
      .addEventListener("click", clearSearch.bind());
  }

  if (active === "customers") {
    searchView.renderCustomerSearch();

    document
      .querySelector(".btn-search")
      .addEventListener("click", search.bind(null, CUSTOMER_HEAD));

    document
      .querySelector(".btn-clear-search")
      .addEventListener("click", clearSearch.bind());

    toggleFilters();
  }

  if (active === "reservations") {
    searchView.renderReservationsSearch();

    document
      .querySelector(".btn-search")
      .addEventListener("click", search.bind(null, RESERVATIONS_HEAD));

    document
      .querySelector(".btn-clear-search")
      .addEventListener("click", clearSearch);
  }

  if (active === "status") {
    searchView.renderStatusSearch();

    document.querySelector(".btn-search").addEventListener("click", getDate);

    document
      .querySelector(".btn-clear-search")
      .addEventListener("click", clearDate);
  }

  if (active === "payments") {
    searchView.renderPaymentsSearch();

    document.querySelector(".btn-search").addEventListener("click", getDate);

    document
      .querySelector(".btn-clear-search")
      .addEventListener("click", clearDate);

    toggleFilters();
  }
};

const getDate = async function () {
  if (active === "status") {
    const date = document.querySelector("#status-date").value;
    if (!date) return;
    await model.getStatus(date);
  }

  if (active === "payments") {
    const period = document.querySelector("#range").value;
    if (!period) return;
    await model.adminGetPayments(period);
  }

  renderState();
};

const clearDate = function () {
  if (active === "status") {
    const date = document.querySelector("#status-date");
    if (!date) return;
    date.value = "";
    model.state.daily = [];
  }

  if (active === "payments") {
    const period = document.querySelector("#range");
    if (!period) return;
    period.value = "";
    model.state.payments = [];
  }

  renderState();
};

const toggleActive = function () {
  document.querySelector(".active").classList.remove("active");
  this.classList.add("active");
};

const revokeHandler = async function (id, order) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm revoke",
    "Do you want to confirm revoking this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.adminRevokeCar(id, order);

    $("#car-info").modal("hide");
    if (res) {
      showAlert("Car revoke was completed successfully");
      renderState();
    } else showAlert("Car revoke failed", false);
  }
  info.classList.remove("z-n");
};

const returnHandler = async function (id, order, cust) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm return",
    "Do you want to confirm returning this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.adminReturnCar(id, order, cust);

    $("#car-info").modal("hide");
    if (res) {
      showAlert("Car return was completed successfully");
      renderState();
    } else showAlert("Car return failed", false);
  }
  info.classList.remove("z-n");
};

const suspendHandler = async function (id) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm revoke",
    "Do you want to confirm suspending this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.suspendCar(id);

    $("#car-info").modal("hide");
    if (res) {
      showAlert("Car suspension was completed successfully");
      renderState();
    } else showAlert("Car suspension failed", false);
  }
  info.classList.remove("z-n");
};

const activateHandler = async function (id) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm revoke",
    "Do you want to confirm activating this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.activateCar(id);

    $("#car-info").modal("hide");
    if (res) {
      showAlert("Car activation was completed successfully");
      renderState();
    } else showAlert("Car activation failed", false);
  }
  info.classList.remove("z-n");
};

const deleteHandler = async function (id) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm revoke",
    "Do you want to confirm deleting this customer?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.deleteCustomer(id);

    $("#car-info").modal("hide");
    if (res) {
      showAlert("Customer deletion was completed successfully");
      renderState();
    } else showAlert("Customer deletion failed", false);
  }
  info.classList.remove("z-n");
};

document.querySelector("footer").innerHTML = `
      Copyrights &copy; ${new Date().getFullYear()} Amr Yasser, Marwan Khaled, and Begad Wael
`;

init();
