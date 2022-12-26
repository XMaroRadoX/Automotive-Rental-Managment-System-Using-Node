"use strict";

class CarsView {
  #cars = document.querySelector(".cars");
  #viewTitle = document.querySelector(".view-title");
  #infoContainer = document.querySelector(".car-info");
  #footerContainer = document.querySelector(".view-footer");
  #carouselContainer = document.querySelector(".carousel-inner");
  #error = document.querySelector(".error-message");
  #message = this.#error.querySelector(".message");
  payContainer = document.querySelector(".payment-container");

  modal = false;
  openCard;

  #renderError = function () {
    this.#error.classList.remove("hide");
    this.#message.textContent = "no cars found";
  };

  #hideError() {
    this.#error.classList.add("hide");
  }

  #clearActive = (active) => {
    active.querySelector(".card-img-top").classList.remove("img-active");
    active.querySelector(".btn-view").classList.add("hidden");
    active.classList.remove("card-active");
  };

  #toggleCard = function (container) {
    if (this.modal) return;

    const card = container.querySelector(".card");
    const active = document.querySelector(".card-active");

    card.querySelector(".card-img-top").classList.toggle("img-active");
    card.querySelector(".btn-view").classList.toggle("hidden");
    card.classList.toggle("card-active");

    if (active && active !== card) this.#clearActive(active);
  };

  setModal() {
    this.modal = true;
  }

  clearModal() {
    this.modal = false;
  }

  #closeModal() {
    this.modal = false;

    const card = document.querySelector(".card-active");

    if (!card) return;
    card.querySelector(".card-img-top").classList.toggle("img-active");
    card.querySelector(".btn-view").classList.toggle("hidden");
    card.classList.toggle("card-active");
  }

  handle() {
    [...document.querySelectorAll(".card-container")].forEach((card) => {
      card.addEventListener("mouseover", this.#toggleCard.bind(this, card));
      card.addEventListener("mouseout", this.#toggleCard.bind(this, card));
    });

    document
      .querySelectorAll(".btn-close-modal")
      .forEach((btn) =>
        btn.addEventListener("click", this.#closeModal.bind(this))
      );
  }

  render(data) {
    const frag = document.createDocumentFragment();
    this.#hideError();
    this.#cars.innerHTML = "";

    if (data.length > 0) {
      data.forEach((car) => {
        const div = document.createElement("div");
        div.classList = "card-container";
        div.insertAdjacentHTML("afterbegin", this.#generateHTML(car));
        frag.appendChild(div);
      });
      this.#cars.appendChild(frag);
    } else {
      this.#renderError();
    }

    document
      .querySelectorAll('[data-bs-toggle="tooltip"]')
      .forEach((tooltip) => {
        new bootstrap.Tooltip(tooltip);
      });
  }

  #generateHTML(car) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    //prettier-ignore
    return `
        <div class = "card" data-car-id ="${car.carId}" data-region="${car.region}">
            <div class="card-header">
              <h3 class="car-brand">${brand} ${car.model.toUpperCase()}</h3>
              <div></div>

              <span class="car-type">${
                car.type[0].toUpperCase() + car.type.slice(1).toLowerCase()
              }</span>
            </div>

            <div class="img-container mx-auto mb-3">
              <img
                src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}"
                class="card-img-top "
                alt="${car.brand} car photo"
              />
            </div>

            <div class="card-body mx-2">
              <div class="seating-label">
                <ion-icon class="car-icon" name="person"></ion-icon>
                <span class="car-seating">${car.seating}</span>
              </div>

              <button class="region-label" data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="${   car.region.length < 4
                    ? car.region.toUpperCase()
                    : car.region[0].toUpperCase() +
                      car.region.slice(1).toLowerCase()}" 
                >
                <ion-icon 
                 
                class="car-icon" name="location-sharp"></ion-icon>
                <span class="car-region">${car.cca3.toUpperCase()}</span>
              </button>

              <div class="rate-label">
                <span class="currency">$</span>
                <span class="car-amount me-1">${car.rate}</span>
                <span class="car-rate">/d</span>
              </div>
              
              <button
               class="btn btn-primary btn-view hidden mt-4"
               data-bs-toggle="modal"
               data-bs-target="#car-info"
              >view</button>
            </div>
          </div>
  `;
  }

  renderCarView(car) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();
    this.#viewTitle.textContent = brand + " " + car.model.toUpperCase();
    this.#carouselContainer.innerHTML = this.#generateCarouselHTML(car);
    this.#infoContainer.innerHTML = this.#generateInfoHTML(car, brand);
    //prettier-ignore
    this.#footerContainer.innerHTML = this.#generateFooterHTML();
  }

  #generateInfoHTML(car, brand) {
    //prettier-ignore
    return `
    <div class="field">
                <div class="info-icon">
                  <ion-icon name="construct"></ion-icon>
                </div>
                <div class="info-text">${brand}</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="speedometer"></ion-icon>
                </div>
                <div class="info-text">${car.model.toUpperCase()}</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="calendar-number"></ion-icon>
                </div>
                <div class="info-text">${car.year}</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="settings"></ion-icon>
                </div>
                <div class="info-text">${
                  car.transmission[0].toUpperCase() +
                  car.transmission.slice(1).toLowerCase()
                }</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="info-text">${
                  car.type[0].toUpperCase() + car.type.slice(1).toLowerCase()
                }</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="flash"></ion-icon>
                </div>
                <div class="info-text">${
                  car.powertrain[0].toUpperCase() + car.powertrain.slice(1).toLowerCase()
                }</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="person"></ion-icon>
                </div>
                <div class="info-text">${car.seating}</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="color-palette"></ion-icon>
                </div>
                <div class="info-text">${
                  car.color[0].toUpperCase() + car.color.slice(1).toLowerCase()
                }</div>
              </div>

              <div class="field">
                <div class="info-icon">
                  <ion-icon name="logo-usd"></ion-icon>
                </div>
                <div class="info-text">${
                  car.rate
                }<span class="car-rate">/d</span></div>
              </div>
             
               <div class="field 
              ">
                <div class="info-icon">
                  <ion-icon name="car-sport"></ion-icon>
                </div>
                <div class="info-text">${car.plateNo}</div>
              </div>

              <div class="field 
              ">
                <div class="info-icon">
                  <ion-icon name="location-sharp"></ion-icon>
                </div>
                <div class="info-text">${
                  car.region.length < 4
                    ? car.region.toUpperCase()
                    : car.region[0].toUpperCase() +
                      car.region.slice(1).toLowerCase()
                }</div>
              </div>


               ${
                 car.status === "reserved" || car.status === "rented"
                   ? `
                <div class="field">
                  <div class="info-icon">
                    <ion-icon name="calendar-number"></ion-icon>
                  </div>
                  <div class="info-text"><span class="pay-sub">reserve date</span>${
                    car.date.split("T")[0]
                  }</div>
                </div>

                <div class="field info-date">
                  <div class="info-icon me-3">
                    <ion-icon name="calendar"></ion-icon>
                  </div>
                  <div class="info-text me-2"><span class="pay-sub">pick-up date</span>${car.pickup.split("T")[0]}</div>
                  <div class="info-text"><span class="pay-sub">drop-off date</span>${car.drop.split("T")[0]}</div>
                </div>

                <div class="field info-order">
                  <div class="info-icon me-3">
                    <ion-icon name="cube"></ion-icon>
                  </div>
                  <div class="info-text me-2"><span class="pay-sub">reservation number</span>${car.resId}</div>
                </div>
              `
                   : ""
               }
    `;
  }

  #generateFooterHTML() {
    let html = `
            <button  
            type="button" class="btn btn-primary btn-reserve disabled">Sign to reserve</button>`;

    return html;
  }

  #generateCarouselHTML(car) {
    return `
    <div class="carousel-item active">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}&angle=09"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}&angle=22"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}&angle=23"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}&angle=13"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://cdn.imagin.studio/getImage?customer=egalexu&target=make&make=${car.brand}&modelFamily=${car.model}&modelYear=${car.year}&paintId=imagin-${car.color}&angle=29"
                    class="d-block w-100"
                    alt="..."
                  />
                </div>`;
  }

  renderPayments(data) {
    this.payContainer.innerHTML = "";

    data.forEach((payment) => {
      let brand = payment.brand;
      brand = brand
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

      if (brand.length < 4) brand = brand.toUpperCase();

      const html = `
    <div class="payment ${payment.status ? "paid" : ""}" data-order-id="${
        payment.orderId
      }" data-car-id="${payment.carId}">
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

      this.payContainer.insertAdjacentHTML("beforeend", html);
    });
  }
}

export default new CarsView();
