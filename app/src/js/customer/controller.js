import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "./model.js";
import filterView from "./views/filtersView.js";
import carsView from "./views/carsView.js";

const container = document.querySelector(".app-container");
const payContainer = document.querySelector(".payment-container");

let active = "home",
  filtered,
  activeCar,
  activePayment;

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
    .querySelectorAll(".btn-nav")
    .forEach((btn) => btn.addEventListener("click", navHandler.bind(btn)));

  const form = document.querySelector(".action-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const flag = form.checkValidity();

    form.classList.add("was-validated");

    if (!flag) {
      e.stopPropagation();
      return;
    }

    const reserveData = {
      pickDate: form.querySelector("#pickup-date").value,
      pickLocation: form.querySelector("#pickup-location").value,
      dropDate: form.querySelector("#drop-off-date").value,
      dropLocation: form.querySelector("#drop-off-location").value,
      id: activeCar.id,
    };

    form.closest(".modal").querySelector(".btn-close-modal").click();
    reserveHandler(reserveData);
    form.querySelector("#pickup-date").value =
      form.querySelector("#pickup-location").value =
      form.querySelector("#drop-off-date").value =
      form.querySelector("#drop-off-location").value =
        "";

    form.classList.remove("was-validated");
  });

  document
    .querySelector(".btn-submit-pay")
    .addEventListener("click", paymentHandler.bind(null));

  document
    .querySelector(".btn-signout")
    .addEventListener("click", model.signout.bind(null));

  handleView();
};

const handleView = function () {
  document.querySelectorAll(".btn-view").forEach((btn) => {
    const id = btn.closest(".card").dataset.carId;

    btn.addEventListener("click", () => {
      carsView.setModal();

      activeCar = getActiveData().filter((c) => c.id === id)[0];

      carsView.renderCarView(activeCar, active);

      if (active === "home")
        document.querySelector(".btn-reserve").addEventListener("click", () => {
          let brand = activeCar.brand;
          brand = brand
            .split(" ")
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
          document.querySelector(".action-title").textContent =
            brand + " " + activeCar.model.toUpperCase();
        });

      if (active === "reserved") {
        document
          .querySelector(".btn-pick-up")
          .addEventListener("click", pickHandler.bind(null, id));

        document
          .querySelector(".btn-revoke")
          .addEventListener("click", revokeHandler.bind(null, id));
      }

      if (active === "rented")
        document
          .querySelector(".btn-return")
          .addEventListener("click", returnHandler.bind(null, id));
    });
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
  const btn = this.querySelector(".fav-inner");
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

  if (!flag)
    carsView.render(data, model.state.favourites, active === "favourites");
  else carsView.render(result, model.state.favourites, active === "favourites");
  carsView.handle();
  handleView();
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

  renderState();
  handleView();

  filtered = false;
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

  payContainer.innerHTML = "";

  model.state.payments.forEach((payment) => {
    let brand = payment.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    const html = `
    <div class="payment ${payment.status ? "paid" : ""}" data-order-id="${
      payment.orderId
    }">
        <div class="pay-car">${brand + " " + payment.model.toUpperCase()}</div>
        <div class="pay-rate"><span class="pay-sub">rate/day</span>$${
          payment.rate
        }</div>

        <div class="pay-status">
          <ion-icon class="pay-icon ${
            payment.status ? "hide" : ""
          }" name="close-outline"></ion-icon>
          <ion-icon
            class="pay-icon pay-check ${payment.status ? "" : "hide"}"
            name="checkmark-outline"
          ></ion-icon>
        </div>

        <div class="pay-date">
          <span class="pay-sub">Order number</span> ${payment.orderId}
        </div>
        <div class="pay-total"><span class="pay-sub">Total ${
          payment.status ? `(${payment.method})` : ""
        }</span>$${payment.payment}</div>

        <div class="pay-footer">
          <div class="pay-date">
            <span class="pay-sub">Pick-up Date</span>${
              payment.pickup.split("T")[0]
            }
          </div>
          <div class="pay-date">
            <span class="pay-sub">Drop-off Date</span>${
              payment.drop.split("T")[0]
            }
          </div>
          <div class="pay-date">
            <span class="pay-sub">Return Date</span>${
              payment.return.split("T")[0]
            }
          </div>
          <div class="pay-date">
            <span class="pay-sub">payment Date</span>${
              payment.payDate ? `${payment.payDate.split("T")[0]}` : "-"
            }
          </div>
          <div class="pay-date">
            <span class="pay-sub">Duration</span>${payment.duration}
            <span class="pay-sub">days</span>
          </div>
        </div>
        <button type="button" data-bs-toggle="modal" data-bs-target="#pay" class="btn btn-primary btn-pay ${
          payment.status ? "hide" : ""
        }">pay</button>
        <button type="button" class="btn btn-primary btn-paid disabled ${
          payment.status ? "" : "hide"
        }">
          paid
        </button>
      </div>
      `;

    payContainer.insertAdjacentHTML("beforeend", html);
  });

  payContainer.querySelectorAll(".btn-pay").forEach((btn) => {
    btn.addEventListener("click", () => {
      activePayment = btn.closest(".payment").dataset.orderId;
    });
  });
};

const paymentHandler = async function () {
  const method = document.querySelector("#credit-card").checked
    ? "credit card"
    : "cash";
  await model.makePayment(activePayment, method);
  renderPayments();
};

const pickHandler = function (id) {
  model.pickCar(id);
  renderState();
};

const revokeHandler = function (id) {
  model.revokeCar(id);
  renderState();
};

const reserveHandler = function (info) {
  model.reserveCar(info);
  renderState();
};

const returnHandler = function (id) {
  model.returnCar(id);
  renderState();
};

init();
