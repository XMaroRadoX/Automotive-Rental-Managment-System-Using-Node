"use strict";

import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "../model.js";
import filterView from "../filtersView.js";
import carsView from "./views/carsView.js";

const container = document.querySelector(".app-container");
const payContainer = document.querySelector(".payment-container");
const info = document.querySelector("#car-info");
const alert = document.querySelector(".alert");
const pick = document.querySelector("#pickup-date");
const drop = document.querySelector("#drop-off-date");
const d = new Date();
const t = new Date();
t.setDate(d.getDate() + 1);
// prettier-ignore
const today = `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2,"0")}-${`${d.getDate()}`.padStart(2, "0")}`;
// prettier-ignore
const tommorow = `${t.getFullYear()}-${`${t.getMonth() + 1}`.padStart(2,"0")}-${`${t.getDate()}`.padStart(2, "0")}`;
const maxDuration = new Date();
maxDuration.setDate(d.getDate() + 30);

//prettier-ignore
const max = `${maxDuration.getFullYear()}-${`${maxDuration.getMonth() + 1}`.padStart(2,"0")}-${`${maxDuration.getDate()}`.padStart(2,"0")}`;

let confirm;

let active = "home",
  filtered,
  activeCar;

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
  const name = await model.getData();

  document.querySelector(".welcome").textContent = `Welcome back, ${
    name[0].toUpperCase() + name.slice(1).toLowerCase()
  }!`;

  carsView.render(model.state.cars, model.state.favourites);
  carsView.handle();
  addFilters();

  document.querySelector(".btn-apply").addEventListener("click", filter.bind());
  document.querySelector(".btn-reset").addEventListener("click", reset.bind());

  document
    .querySelectorAll(".btn-nav")
    .forEach((btn) => btn.addEventListener("click", navHandler.bind(btn)));

  document
    .querySelector(".btn-submit-pay")
    .addEventListener("click", paymentHandler.bind(null));

  document
    .querySelector(".btn-signout")
    .addEventListener("click", model.signOut.bind(null));

  pick.min = today;
  drop.min = today;
  drop.max = today;
  pick.max = max;

  pick.addEventListener("input", () => {
    drop.min = pick.value;
    const date = new Date(pick.value);
    date.setDate(date.getDate() + 45);

    //prettier-ignore
    const max = `${date.getFullYear()}-${`${date.getMonth() + 1}`.padStart(2,"0")}-${`${date.getDate()}`.padStart(2,"0")}`;

    drop.max = max;
  });

  handleView();
  handleForm();
};

const handleForm = function () {
  const form = document.querySelector(".action-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const flag = form.checkValidity();

    form.classList.add("was-validated");

    if (!flag) {
      e.stopPropagation();
      return;
    }

    const formData = new FormData(form);

    const reserveData = {};

    [...formData.entries()].forEach(
      (entry) => (reserveData[entry[0]] = entry[1])
    );
    reserveData.car_id = activeCar.car_id;

    info.classList.add("z-n");
    showConfirmation(
      "confirm reservation",
      "Do you want to confirm reserving this car?",
      "confirm"
    );

    let res = await confirm.then((ev) => true).catch(() => false);

    if (res) {
      reserveHandler(reserveData);
      form.querySelector("#pickup-date").value =
        form.querySelector("#pickup-location").value =
        form.querySelector("#drop-off-date").value =
        form.querySelector("#drop-off-location").value =
          "";

      form.classList.remove("was-validated");
      $("#car-info").modal("hide");

      pick.min = today;
      drop.min = today;
      drop.max = today;
      pick.max = max;
    }
    info.classList.remove("z-n");
  });
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

  document.querySelector("#close-confirm").addEventListener("click", () => {
    $("#confirm-modal").modal("toggle");
  });

  $("#confirm-modal").modal("show");
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
    const order = btn.dataset.resId;

    btn.addEventListener("click", () => {
      document.querySelector("#action").classList.add("hide");

      carsView.setModal();

      activeCar = getActiveData().filter((c) => c.car_id === id)[0];

      carsView.renderCarView(activeCar, active);

      if (active === "home" || active === "favourites") {
        if (activeCar.status === "active") {
          const form = document.querySelector("#action");
          form.classList.remove("hide");
          form.querySelector("#pickup-date").value =
            form.querySelector("#pickup-location").value =
            form.querySelector("#drop-off-date").value =
            form.querySelector("#drop-off-location").value =
              "";
          pick.min = today;
          drop.min = today;
          drop.max = today;
          pick.max = max;

          form.classList.remove("was-validated");
        }

        document
          .querySelector(".btn-reserve")
          .addEventListener("click", async () => {
            let brand = activeCar.brand;
            brand = brand
              .split(" ")
              .map(
                (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ");
          });
      }

      if (active === "reserved") {
        document
          .querySelector(".btn-pick-up")
          .addEventListener("click", pickHandler.bind(null, id));

        document
          .querySelector(".btn-revoke")
          .addEventListener("click", revokeHandler.bind(null, id, order));
      }

      if (active === "rented") {
        document
          .querySelector(".btn-return")
          .addEventListener("click", returnHandler.bind(null, id, order));
      }
    });
  });
};

const addFilters = () => {
  model.state.filters.forEach((filter) => {
    filterView.renderFilter(filter);
  });

  filterView.addFiltersHandler();
};

export const favouriteHandler = async function () {
  const btn = this.querySelector(".fav-inner");
  btn.classList.toggle("fav-active");
  const id = this.closest(".card").dataset.carId;

  if (btn.classList.contains("fav-active")) {
    const res = await model.addFavorite(id);
    if (res[0]) showAlert(res[1]);
    else showAlert(res[1], false);
  } else {
    const res = await model.removeFavorite(id);
    if (res[0]) showAlert(res[1]);
    else showAlert(res[1], false);
  }

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

  if (!flag)
    carsView.render(data, model.state.favourites, active === "favourites");
  else carsView.render(result, model.state.favourites, active === "favourites");
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

  filtered = false;
  renderState();
  handleView();
};

const renderState = function () {
  carsView.clearModal();
  carsView.render(
    getActiveData(),
    model.state.favourites,
    active === "favourites"
  );
  carsView.handle();
  handleView();

  if (filtered) filter();
};

const navHandler = function (e) {
  e.preventDefault();

  const action = this.dataset.action;
  active = action;

  if (active === "payment") {
    container.classList.add("hide");
    if (payContainer.classList.contains("hide"))
      payContainer.classList.remove("hide");
    toggleActive.call(this);
    renderPayments();
    return;
  }

  if (container.classList.contains("hide")) container.classList.remove("hide");
  payContainer.classList.add("hide");

  toggleActive.call(this);
  renderState();
};

const toggleActive = function () {
  document.querySelector(".active").classList.remove("active");
  this.classList.add("active");
};

const renderPayments = async function () {
  await model.getPayments();
  if (!model.state.payments) return;

  carsView.renderPayments(model.state.payments);

  payContainer.querySelectorAll(".btn-pay").forEach((btn) => {
    const pay = btn.closest(".payment");
    const order = pay.dataset.orderId;
    const car = pay.dataset.carId;

    btn.addEventListener("click", () =>
      document
        .querySelector(".btn-submit-pay")
        .addEventListener("click", paymentHandler.bind(null, order, car))
    );
  });
};

const paymentHandler = async function (order, car) {
  const method = document.querySelector("#credit-card").checked
    ? "credit card"
    : "cash";

  document.querySelector("#pay").classList.add("z-n");
  showConfirmation(
    "confirm payment",
    `Do you want to confirm paying for this order by ${method}?`,
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);
  if (res) {
    res = await model.makePayment(order, car, method);
    if (res[0]) {
      showAlert(res[1]);
      $("#pay").modal("hide");
      renderPayments();
    } else showAlert(res[1], false);
  }
  document.querySelector("#pay").classList.remove("z-n");
};

const pickHandler = async function (id) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm pick",
    "Do you want to confirm picking this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);
  if (res) {
    res = await model.pickCar(id);
    $("#car-info").modal("hide");
    if (res[0]) showAlert(res[1]);
    else showAlert(res[1], false);

    renderState();
  }
  info.classList.remove("z-n");
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
    res = await model.revokeCar(id, order);
    $("#car-info").modal("hide");
    if (res[0]) showAlert(res[1]);
    else showAlert(res[1], false);
    renderState();
  }
  info.classList.remove("z-n");
};

const reserveHandler = async function (info) {
  let res = await model.reserveCar(info, active === "favourites");
  $("#car-info").modal("hide");
  if (res[0]) showAlert(res[1]);
  else showAlert(res[1], false);

  renderState();
};

const returnHandler = async function (id, order) {
  info.classList.add("z-n");
  showConfirmation(
    "confirm return",
    "Do you want to confirm returning this car?",
    "confirm"
  );

  let res = await confirm.then((ev) => true).catch((e) => false);

  if (res) {
    res = await model.returnCar(id, order);
    $("#car-info").modal("hide");
    if (res[0]) showAlert(res[1]);
    else showAlert(res[1], false);
    renderState();
  }
  info.classList.remove("z-n");
};

document.querySelector("footer").innerHTML = `
      Copyrights &copy; ${new Date().getFullYear()} Amr Yasser, Marwan Khaled, and Begad Wael
`;

init();
