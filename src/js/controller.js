import "core-js/stable"; // polyfill everything
import "regenerator-runtime/runtime"; // polyfill async/await
import * as model from "./model.js";
import filterView from "./customer views/filterView.js";

const init = async () => {
  const countries = await model.getCountries();
  filterView.initUI(countries, model.selectHandler);
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
    region: "egy",
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
    region: "egy",
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
    region: "egy",
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
    region: "egy",
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
    region: "egy",
  },
];

const frag = document.createDocumentFragment();

data.forEach((car) => {
  const div = document.createElement("div");
  div.classList = "card";
  div.dataset.catId = car.id;
  div.dataset.region = car.region;
  //prettier-ignore
  const html = `
            <div class="card-header">
              <h3 class="car-name">${car.brand[0].toUpperCase() + car.brand.slice(1).toLowerCase()}</h3>
              <button class="fav-btn">
                <i class="bi bi-heart"></i>
              </button>
              <span class="car-type">${car.type}</span>
            </div>

            <img src="${car.src}" class="card-img-top mx-auto" alt="..." />

            <div class="card-body">
              <div>
                <i class="bi bi-person-fill car-icon"></i>
                <span class="car-seating">${car.seating}</span>
              </div>

              <div>
                <i class="bi bi-gear-fill car-icon"></i>
                <span class="car-transmission">${car.transmission}</span>
              </div>

              <div>
                <span class="currency">$</span>
                <span class="car-amount me-1">${car.rate}</span>
                <span class="car-rate">/d</span>
              </div>
            </div>
  `;
  div.insertAdjacentHTML("afterbegin", html);
  frag.appendChild(div);
});

car.appendChild(frag);

document.querySelectorAll(".btn-fav").addeventListener("click", () => {});
