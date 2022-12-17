import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "./model.js";
import filterView from "./views/filterView.js";

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
  const data = await model.getCars();
  renderCars(data);
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
    new bootstrap.Tooltip(tooltip);
  });
};
init();

const renderCars = (data) => {
  const car = document.querySelector(".cars");
  const frag = document.createDocumentFragment();

  data.forEach((car) => {
    const div = document.createElement("div");
    div.classList = "card-container";
    const html = `
        <div class = "card" data-car-id ="${car.id}" data-region="${
      car.region
    }">
            <div class="card-header">
              <h3 class="car-name">${
                car.brand[0].toUpperCase() + car.brand.slice(1).toLowerCase()
              }</h3>
              <button class="btn-fav">
                <i class="bi bi-heart">
                  <i class="bi bi-heart-fill"></i>
                </i>
              </button>

              <span class="car-type">${
                car.type[0].toUpperCase() + car.type.slice(1).toLowerCase()
              }</span>
            </div>

            <div class="img-container mx-auto mb-3">
              <img
                src="${car.src}"
                class="card-img-top "
                alt="${car.description}"
              />
            </div>

            <div class="card-body mx-2">
              <div class="seating-label">
                <i class="bi bi-person-fill car-icon"></i>
                <span class="car-seating">${car.seating}</span>
              </div>

              <div
                class="region-label"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="${car.region}"
              >
                <i class="bi bi-geo-alt-fill car-icon"></i>
                <span class="car-region">${car.cca3.toUpperCase()}</span>
              </div>

              <div class="rate-label">
                <span class="currency">$</span>
                <span class="car-amount me-1">${car.rate}</span>
                <span class="car-rate">/d</span>
              </div>

              <button class="btn-view hidden mt-4">View</button>
            </div>
          </div>
  `;
    div.insertAdjacentHTML("afterbegin", html);
    frag.appendChild(div);
  });
  car.innerHTML = "";
  car.appendChild(frag);

  // document.querySelector(".btn-fav").addEventListener("click", () => {});
  const clearActive = (active) => {
    active.classList.remove("card-active");
    active.querySelector(".btn-view").classList.add("hidden");
    active.querySelector(".card-img-top").classList.remove("img-active");
  };

  const toggleCard = function () {
    const active = document.querySelector(".card-active");

    this.querySelector(".btn-view").classList.toggle("hidden");
    this.classList.toggle("card-active");
    this.querySelector(".card-img-top").classList.toggle("img-active");

    if (active && active !== this) clearActive(active);
  };

  [...document.querySelectorAll(".card")].forEach((card) => {
    card.addEventListener("mouseover", toggleCard.bind(card));
    card.addEventListener("mouseout", toggleCard.bind(card));
  });

  document.querySelectorAll(".btn-fav").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("hhh");
    });
  });
};
