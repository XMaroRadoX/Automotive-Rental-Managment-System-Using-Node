"use strict";

import {
  filterHandler,
  regionHandler,
  seatingHandler,
  pricingHandler,
  yearHandler,
} from "./filterHandlers.js";

class FilterView {
  #container = document.querySelector(".app-container");
  #countrySelect;
  #regionFlag;
  #range = document.querySelector(".seat-range");
  #price = document.querySelector(".price-range");
  #incSeats = document.querySelector(".seat-plus");
  #decSeats = document.querySelector(".seat-minus");
  #seatingLabel = document.querySelector(".seating-label");
  #seating = 1;
  min = 0;
  max = 0;

  initUI(countries) {
    this.#renderFilterContainer();
    this.#assign();

    this.#renderCountries(countries);
    this.#countrySelect.addEventListener(
      "change",
      this.#selectHandler.bind(this)
    );
    this.#seatingHandler();
    this.#priceHandler();
    this.#yearHandler();
  }

  #assign() {
    this.#countrySelect = document.querySelector(".form-select");
    this.#regionFlag = document.querySelector(".region-flag");
    this.#range = document.querySelector(".form-range");
    this.#incSeats = document.querySelector(".seat-plus");
    this.#decSeats = document.querySelector(".seat-minus");
    this.#seatingLabel = document.querySelector(".seating-label");
  }

  renderFilter(data) {
    const name = data.name;
    const categories = data.categories;
    categories.sort((a, b) => a.name.localeCompare(b.name));
    const container = document.querySelector(`.${name}-grp`);
    const frag = document.createDocumentFragment();

    categories.forEach((category, i) => {
      const div = document.createElement("div");
      if (i > 0) div.classList = "mt-3";
      div.insertAdjacentHTML(
        "afterbegin",
        this.#generateFilterHTML(name, category)
      );
      frag.appendChild(div);
    });

    container.append(frag);
  }

  addFiltersHandler() {
    const container = document.querySelector(".filters-container");
    const btns = container.querySelectorAll(".form-check-input");
    btns.forEach((btn) => {
      btn.addEventListener("change", filterHandler.bind(btn));
    });
  }

  #renderFilterContainer() {
    document.querySelector(".filters")?.remove();
    this.#container
      .querySelector(".sidebar-container")
      .querySelector(".sub-heading")
      ?.remove();

    //prettier-ignore
    const html = `
        <h2 class="sub-heading">Filter by</h2>
        <div class="filters">
          <div class="filter mt-3" data-filter="type">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseType"
              aria-expanded="false"
              aria-controls="collapseType"
            >
              <span class="filter-text">Car Type</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapseType">
              <div class="collapse-body type-grp mt-2"></div>
            </div>
          </div>

          <div class="filter mt-5" data-filter="region">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRegion"
              aria-expanded="false"
              aria-controls="collapseRegion"
            >
              <span class="filter-text">Region</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>

            <div class="collapse" id="collapseRegion">
              <div class="collapse-body region-grp mt-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/White_flag_of_surrender.svg/640px-White_flag_of_surrender.svg.png"
                  class="region-flag mb-3"
                  alt="Empty flag"
                />
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                ></select>
              </div>
            </div>
          </div>

          <div class="filter mt-5" data-filter="transmission">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTransmission"
              aria-expanded="false"
              aria-controls="collapseTransmission"
            >
              <span class="filter-text">Transmission</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapseTransmission">
              <div class="collapse-body transmission-grp mt-2"></div>
            </div>
          </div>

          <div class="filter mt-5" data-filter="powertrain">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePowertrain"
              aria-expanded="false"
              aria-controls="collapsePowertrain"
            >
              <span class="filter-text">Powertrain</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapsePowertrain">
              <div class="collapse-body powertrain-grp mt-2"></div>
            </div>
          </div>

           <div class="filter mt-5" data-filter="brand">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBrand"
              aria-expanded="false"
              aria-controls="collapseBrand"
            >
              <span class="filter-text">Brand</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>

            <div class="collapse" id="collapseBrand">
              <div class="collapse-body brand-grp mt-2"></div>
            </div>
          </div>

           <div class="filter mt-5" data-filter="year">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseYear"
              aria-expanded="false"
              aria-controls="collapseYear"
            >
              <span class="filter-text">Model Year</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapseYear">
              <div class="collapse-body mt-2">
              <div class="year-container">
                    <input type="number" class="price-range" id="year" placeholder="2022" value="" min="0" max="2023"/>
              </div>
                <label for="price" class="form-label pricing-label">1950 - 2023</label>
              </div>
            </div>
          </div>

          <div class="filter mt-5" data-filter="color">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseColor"
              aria-expanded="false"
              aria-controls="collapseColor"
            >
              <span class="filter-text">Color</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>

            <div class="collapse" id="collapseColor">
              <div class="collapse-body color-grp mt-2"></div>
            </div>
          </div>

           <div class="filter mt-5" data-filter="price">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePrice"
              aria-expanded="false"
              aria-controls="collapsePrice"
            >
              <span class="filter-text">Rate/Day</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapsePrice">
              <div class="collapse-body mt-2">
                <div class="pricing-container">
                  <div>
                    <label for="price-min">Min</label>
                    <input type="number" class="price-range" id="price-min" placeholder="50" value="" min="50" max="8000"/>
                  </div>

                   <div>
                    <label for="price-max">Max</label>
                    <input type="number" class="price-range" id="price-max" placeholder="50" value="" min="50" max="8000"/>
                  </div>
                </div>
                <label for="price" class="form-label pricing-label">50$ - 8000$</label>
              </div>
            </div>
          </div>

          <div class="filter mt-5" data-filter="seating">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePassengers"
              aria-expanded="false"
              aria-controls="collapsePassengers"
            >
              <span class="filter-text">Seating Capacity</span>
              <ion-icon class="chevron-down ms-2" name="chevron-down-outline"></ion-icon>
            </button>
            <div class="collapse" id="collapsePassengers">
              <div class="collapse-body mt-2">
                <div class="seating-container">
                  <button class="btn-seat seat-minus">
                    <ion-icon class="seat-icon" name="remove-outline"></ion-icon>
                  </button>
                  <input
                    type="range"
                    class="form-range seat-rang mx-4"
                    min="1"
                    max="14"
                    value="1"
                    id="seatings"
                  />
                  <button class="btn-seat seat-plus">
                    <ion-icon class="seat-icon" name="add-outline"></ion-icon>
                  </button>
                </div>
                <label for="seatings" class="form-label seating-label">Any (2-14)</label>
              </div>
            </div>
          </div>

            

         
        </div>
    `;

    this.#container
      .querySelector(".sidebar-container")
      .insertAdjacentHTML("afterbegin", html);

    this.#container
      .querySelector(".sidebar-container")
      .classList.add("filters-container");

    document
      .querySelectorAll(".btn-filter")
      .forEach((btn) =>
        btn.addEventListener("click", this.#filterHandler.bind(btn))
      );
  }

  #generateFilterHTML(type, category) {
    let name = category.name;
    name = name
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (name === "Cvt") name = name.toUpperCase();
    if (name.length < 4 && type === "brand") name = name.toUpperCase();

    return `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${category.name}"
      id="check${category.name}"
    />
    <label class="form-check-label" for="check${category.name}">
    ${name} (${category.count})
    </label>
  `;
  }

  #renderCountries(countries) {
    const frag = document.createDocumentFragment();
    countries.forEach((country) => {
      const opt = document.createElement("option");
      opt.value = country.cca2;
      opt.textContent = country.name;
      opt.dataset.cca3 = country.cca3;
      opt.dataset.name = country.name;
      frag.appendChild(opt);
    });

    this.#countrySelect.append(frag);
    const opt = document.createElement("option");
    opt.value = "-";
    opt.textContent = "-";
    this.#countrySelect.insertAdjacentElement("afterbegin", opt);
    this.#countrySelect.value = "-";
  }

  #filterHandler() {
    this.classList.toggle("open");
    const icon = this.querySelector(".chevron-down");
    icon.classList.toggle("rotate");
  }

  #seatingHandler() {
    this.#range.addEventListener("change", () => {
      this.#seating = +this.#range.value;
      this.#seatingLabel.textContent =
        this.#seating > 1 ? this.#seating + " Persons" : "Any (2-14)";
      seatingHandler(this.#seating);
    });

    this.#incSeats.addEventListener("click", () => {
      if (this.#seating === 14) return;
      this.#seating++;
      this.#range.value = this.#seating;
      this.#seatingLabel.textContent = this.#seating + " Persons";
      seatingHandler(this.#seating);
    });

    this.#decSeats.addEventListener("click", () => {
      if (this.#seating === 1) return;
      this.#seating--;
      this.#range.value = this.#seating;
      this.#seatingLabel.textContent =
        this.#seating > 1 ? this.#seating + " Persons" : "Any (2-14)";
      seatingHandler(this.#seating);
    });
  }

  #selectHandler() {
    if (this.#countrySelect.value == "-") {
      this.#regionFlag.alt = "White Flag";
      this.#regionFlag.src =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/White_flag_of_surrender.svg/640px-White_flag_of_surrender.svg.png";
      regionHandler("");
      return;
    }

    this.#regionFlag.src = `https://flagicons.lipis.dev/flags/4x3/${this.#countrySelect.value.toLowerCase()}.svg`;

    this.#regionFlag.alt =
      this.#countrySelect.querySelector(
        `[value = "${this.#countrySelect.value}"]`
      ).textContent + " Flag";

    regionHandler(this.#countrySelect.value);
  }

  #yearHandler() {
    const yearField = document.querySelector("#year");
    yearField.addEventListener("change", () => {
      let year = +yearField.value;
      if (year < 1980 || year > 2023) {
        yearField.value = "";
        year = "";
      }
      console.log(year);
      yearHandler(year);
    });
  }

  #priceHandler() {
    const pMin = document.querySelector("#price-min");
    pMin.addEventListener("input", () => {
      this.min = +pMin.value;
      if (this.min > 8000) {
        this.min = 8000;
        pMin.value = "8000";
      }
      pricingHandler(this.min, this.max);
    });

    const pMax = document.querySelector("#price-max");
    pMax.addEventListener("input", () => {
      this.max = +pMax.value;

      if (this.max > 8000) {
        this.max = 8000;
        pMax.value = "8000";
      }
      pricingHandler(this.min, this.max);
    });
  }

  reset() {
    this.#container
      .querySelectorAll(".form-check-input")
      .forEach((box) => (box.checked = false));

    this.#countrySelect.value = "-";
    this.#regionFlag.src =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/White_flag_of_surrender.svg/640px-White_flag_of_surrender.svg.png";

    this.#range.value = 1;
    this.#seating = 1;
    this.#seatingLabel.textContent = "Any (2-14)";

    document.querySelector("#price-min").value = "";
    document.querySelector("#price-max").value = "";
    document.querySelector("#year").value = "";
  }
}

export default new FilterView();
