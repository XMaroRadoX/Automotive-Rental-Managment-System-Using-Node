import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "./model.js";
import filterView from "./customer views/filterView.js";

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries);
};

init();

const car = document.querySelector(".cars");

const data = [
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/vTcKFg9r/car.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/vTcKFg9r/car.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
  {
    id: "1234",
    brand: "volkswagen",
    type: "sport",
    seating: "4",
    transmission: "automatic",
    src: "https://i.postimg.cc/Hnzb2Bj3/1gti-front.webp",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
  },
];

const frag = document.createDocumentFragment();

data.forEach((car) => {
  const div = document.createElement("div");
  div.classList = "card";
  div.dataset.catId = car.id;
  // TBD
  div.dataset.region = car.region;
  //prettier-ignore
  const html = `
            <div class="card-header">
              <h3 class="car-name">${car.brand[0].toUpperCase()+car.brand.slice(1).toLowerCase()}</h3>
              <button class="btn-fav">
                <i class="bi bi-heart"></i>
              </button>
              <span class="car-type">${car.type[0].toUpperCase()+car.type.slice(1).toLowerCase()}</span>
            </div>

            <img
              src="${car.src}"
              class="card-img-top mx-auto mb-3"
              alt="${car.description}"
            />

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
  `;
  div.insertAdjacentHTML("afterbegin", html);
  frag.appendChild(div);
});

car.appendChild(frag);

// document.querySelector(".btn-fav").addEventListener("click", () => {});

[...document.querySelectorAll(".card")].forEach((card) => {
  card.addEventListener("click", async (e) => {
    if (
      e.target.classList.contains("btn-view") ||
      e.target.classList.contains("bi-heart") ||
      e.target.classList.contains("btn-fav")
    )
      return;

    const active = document.querySelector(".card-active");

    if (active && active !== card) {
      active.classList.remove("card-active");
      active.querySelector(".btn-view").classList.add("hidden");
    }

    card.querySelector(".btn-view").classList.toggle("hidden");
    card.classList.toggle("card-active");
  });
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
