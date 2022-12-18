import { favouriteHandler } from "../controller.js";

class CarsView {
  #cars = document.querySelector(".cars");

  handle() {
    const toggleCard = function () {
      const clearActive = (active) => {
        active.classList.remove("card-active");
        active.querySelector(".btn-view").classList.add("hidden");
        active.querySelector(".card-img-top").classList.remove("img-active");
      };

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
      btn.addEventListener("click", favouriteHandler.bind(btn));
    });
  }

  render(data, favs) {
    const frag = document.createDocumentFragment();

    if (data)
      data.forEach((car) => {
        const div = document.createElement("div");
        div.classList = "card-container";
        div.insertAdjacentHTML(
          "afterbegin",
          this.#generateHTML(
            car,
            favs.filter((fCar) => fCar.id == car.id).length > 0
          )
        );
        frag.appendChild(div);
      });

    this.#cars.innerHTML = "";
    this.#cars.appendChild(frag);
  }

  #generateHTML(car, flag) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    //prettier-ignore
    return `
        <div class = "card" data-car-id ="${car.id}" data-region="${
      car.region
    }">
            <div class="card-header">
              <h3 class="car-brand">${brand} ${car.model.toUpperCase()}</h3>
              <button class="btn-fav">
                <i class="bi bi-heart">
                  <i class="bi bi-heart-fill ${flag?"fav-active":""}"></i>
                </i>
              </button>

              <span class="car-type">${
                car.type[0].toUpperCase() + car.type.slice(1).toLowerCase()
              }</span>
            </div>

            <div class="img-container mx-auto mb-3">
              <img
                src="https://cdn.imagin.studio/getImage?customer=egalexandria-university-faculty-of-engineering&make=${car.brand}&modelfamily=${car.model}&modelYear=${car.year}&paintId=imagine-${car.color}"
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
  }
}

export default new CarsView();
