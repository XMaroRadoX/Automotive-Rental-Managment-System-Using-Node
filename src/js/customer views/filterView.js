import { TYPES, TRANSMISSIONS, BRANDS, COLORS } from "../config.js";

class FilterView {
  #container = document.querySelector(".app-container");
  #typeGroup;
  #transmissionGroup;
  #brandGroup;
  #colorGroup;
  #countrySelect;
  #regionFlag;
  seating = 2;

  initUI(countries) {
    this.#renderFilters();

    this.#assign();
    this.#handle();
    this.#render(countries);
  }

  #render(countries) {
    this.#renderTypes();
    this.#renderCountries(countries);
    this.#renderTransmissions();
    this.#renderBrands();
    this.#renderColors();
  }

  #handle() {
    this.#countrySelect.addEventListener(
      "change",
      this.#selectHandler.bind(this)
    );

    this.#handleSeating();
  }

  #assign() {
    this.#typeGroup = document.querySelector(".type-grp");
    this.#countrySelect = document.querySelector(".form-select");
    this.#regionFlag = document.querySelector(".region-flag");
    this.#transmissionGroup = document.querySelector(".transmission-grp");
    this.#brandGroup = document.querySelector(".brand-grp");
    this.#colorGroup = document.querySelector(".color-grp");
  }

  #renderFilters() {
    const html = `
        <h2 class="sub-heading">Filter by</h2>
        <div class="filters">
          <div class="filter mt-3">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseType"
              aria-expanded="false"
              aria-controls="collapseType"
            >
              <span class="filter-text">Car Type</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>
            <div class="collapse" id="collapseType">
              <div class="collapse-body type-grp mt-2"></div>
            </div>
          </div>

          <div class="filter mt-5">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRegion"
              aria-expanded="false"
              aria-controls="collapseRegion"
            >
              <span class="filter-text">Region</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>

            <div class="collapse" id="collapseRegion">
              <div class="collapse-body region-grp mt-2">
                <img
                  src="https://flagcdn.com/eg.svg"
                  class="region-flag mb-3"
                  alt="Uae flag"
                />
                <select
                  class="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                ></select>
              </div>
            </div>
          </div>

          <div class="filter mt-5">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTransmission"
              aria-expanded="false"
              aria-controls="collapseTransmission"
            >
              <span class="filter-text">Transmission</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>
            <div class="collapse" id="collapseTransmission">
              <div class="collapse-body transmission-grp mt-2"></div>
            </div>
          </div>

          <div class="filter mt-5">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsePassengers"
              aria-expanded="false"
              aria-controls="collapsePassengers"
            >
              <span class="filter-text">Seating Capacity</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>
            <div class="collapse" id="collapsePassengers">
              <div class="collapse-body mt-2">
                <div class="seating-container">
                  <button class="btn-seat seat-minus">
                    <i class="bi bi-dash"></i>
                  </button>
                  <input
                    type="range"
                    class="form-range mx-4"
                    min="2"
                    max="14"
                    value="2"
                    id="seatings"
                  />
                  <button class="btn-seat seat-plus">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
                <label for="seatings" class="form-label seating-label"
                  >2 Persons</label
                >
              </div>
            </div>
          </div>

          <div class="filter mt-5">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseBrand"
              aria-expanded="false"
              aria-controls="collapseBrand"
            >
              <span class="filter-text">Brand</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>

            <div class="collapse" id="collapseBrand">
              <div class="collapse-body brand-grp mt-2"></div>
            </div>
          </div>

          <div class="filter mt-5">
            <button
              class="btn-filter"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseColor"
              aria-expanded="false"
              aria-controls="collapseColor"
            >
              <span class="filter-text">Color</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>

            <div class="collapse" id="collapseColor">
              <div class="collapse-body color-grp mt-2"></div>
            </div>
          </div>
        </div>
    `;

    this.#container
      .querySelector(".filter-container")
      .insertAdjacentHTML("afterbegin", html);

    document
      .querySelectorAll(".btn-filter")
      .forEach((btn) =>
        btn.addEventListener("click", this.#filterHandler.bind(btn))
      );
  }

  #renderTypes() {
    const frag = document.createDocumentFragment();

    TYPES.sort((a, b) => a.localeCompare(b));

    TYPES.forEach((type, i) => {
      const name = type[0].toUpperCase() + type.slice(1).toLowerCase();
      const div = document.createElement("div");
      if (i > 0) div.classList = "mt-3";
      const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${type}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
      div.insertAdjacentHTML("afterbegin", html);
      frag.appendChild(div);
    });

    this.#typeGroup.append(frag);
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
    this.#countrySelect.value = "EG";
  }

  #renderTransmissions() {
    TRANSMISSIONS.sort((a, b) => a.localeCompare(b));
    const frag = document.createDocumentFragment();

    TRANSMISSIONS.forEach((t, i) => {
      let name = t[0].toUpperCase() + t.slice(1).toLowerCase();
      if (name === "Cvt") name = name.toUpperCase();

      const div = document.createElement("div");
      if (i > 0) div.classList = "mt-3";
      const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${t}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
      div.insertAdjacentHTML("afterbegin", html);
      frag.appendChild(div);
    });

    this.#transmissionGroup.append(frag);
  }

  #renderBrands() {
    BRANDS.sort((a, b) => a.localeCompare(b));

    const frag = document.createDocumentFragment();

    BRANDS.forEach((brand, i) => {
      let name = brand[0].toUpperCase() + brand.slice(1).toLowerCase();
      if (brand.length < 4) name = name.toUpperCase();

      const div = document.createElement("div");
      if (i > 0) div.classList = "mt-3";
      const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${brand}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
      div.insertAdjacentHTML("afterbegin", html);
      frag.appendChild(div);
    });

    this.#brandGroup.append(frag);
  }

  #renderColors() {
    COLORS.sort((a, b) => a.localeCompare(b));

    const frag = document.createDocumentFragment();

    COLORS.forEach((color, i) => {
      let name = color[0].toUpperCase() + color.slice(1).toLowerCase();

      const div = document.createElement("div");
      if (i > 0) div.classList = "mt-3";
      const html = `
    <input
      class="form-check-input me-2"
      type="checkbox"
      value="${color}"
      id="check${name}"
    />
    <label class="form-check-label" for="check${name}">${name}</label>
  `;
      div.insertAdjacentHTML("afterbegin", html);
      frag.appendChild(div);
    });

    this.#colorGroup.append(frag);
  }

  // filter handler for btns
  // this = filter btn
  #filterHandler() {
    this.classList.toggle("open");
    const icon = this.querySelector(".bi");
    icon.classList.toggle("rotate");
  }

  #handleSeating() {
    const range = document.querySelector(".form-range");
    const incSeats = document.querySelector(".seat-plus");
    const decSeats = document.querySelector(".seat-minus");
    const seatingLabel = document.querySelector(".seating-label");

    range.addEventListener("change", () => {
      this.seating = +range.value;
      seatingLabel.textContent = this.seating + " Persons";
    });

    incSeats.addEventListener("click", () => {
      if (this.seating === 14) return;
      this.seating++;
      range.value = this.seating;
      seatingLabel.textContent = this.seating + " Persons";
    });

    decSeats.addEventListener("click", () => {
      if (this.seating === 2) return;
      this.seating--;
      range.value = this.seating;
      seatingLabel.textContent = this.seating + " Persons";
    });
  }

  #selectHandler() {
    this.#regionFlag.src = `https://flagicons.lipis.dev/flags/4x3/${this.#countrySelect.value.toLowerCase()}.svg`;
  }
}

export default new FilterView();
