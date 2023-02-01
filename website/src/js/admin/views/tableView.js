"use strict";

class TableView {
  #table = document.querySelector(".query-result");
  #viewTitle = document.querySelector(".view-title");
  #infoContainer = document.querySelector(".car-info");
  #footerContainer = document.querySelector(".view-footer");
  #carouselContainer = document.querySelector(".carousel-inner");
  #addContainer = document.querySelector(".add-container");
  #activeCar;
  #error = document.querySelector(".error-message");
  #message = this.#error.querySelector(".message");
  #num = document.querySelector(".num-rows");

  #renderError = function () {
    this.#error.classList.remove("hide");
    this.#message.textContent = "no data found";
  };

  #hideError() {
    this.#error.classList.add("hide");
  }

  render(data, head, active = "cars") {
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    this.#hideError();
    this.#table.innerHTML = "";

    if (data.length > 0) {
      this.#num.classList.contains("hide") &&
        this.#num.classList.remove("hide");
      this.#num.textContent = `showing ${data.length} row${
        data.length > 1 ? "s" : ""
      }`;
      tr.classList = "table-row table-head";
      tr.innerHTML = head;

      thead.appendChild(tr);

      if (active === "cars")
        if (data.length > 0)
          data.forEach((car, i) => {
            const div = document.createElement("tr");
            div.insertAdjacentHTML(
              "afterbegin",
              this.#generateCarHTML(car, i + 1)
            );
            tbody.appendChild(div);
          });

      if (active === "status")
        if (data.length > 0)
          data.forEach((car, i) => {
            const div = document.createElement("tr");
            div.insertAdjacentHTML(
              "afterbegin",
              this.#generateStatusHTML(car, i + 1)
            );
            tbody.appendChild(div);
          });

      if (active === "customers")
        if (data.length > 0)
          data.forEach((customer, i) => {
            const div = document.createElement("tr");
            div.insertAdjacentHTML(
              "afterbegin",
              this.#generateCustomerHTML(customer, i + 1)
            );
            tbody.appendChild(div);
          });

      if (active === "reservations")
        if (data.length > 0)
          data.forEach((car, i) => {
            const div = document.createElement("tr");
            div.insertAdjacentHTML(
              "afterbegin",
              this.#generateReservationsHTML(car, i + 1)
            );
            tbody.appendChild(div);
          });

      if (active === "payments")
        if (data.length > 0)
          data.forEach((pay, i) => {
            const div = document.createElement("tr");
            div.insertAdjacentHTML(
              "afterbegin",
              this.#generatePaymentsHTML(pay, i + 1)
            );
            tbody.appendChild(div);
          });
      this.#table.appendChild(thead);
      this.#table.appendChild(tbody);
    } else {
      this.#renderError();
      this.#num.classList.add("hide");
    }
  }

  renderCarView(car, active) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();
    this.#viewTitle.textContent = brand + " " + car.model.toUpperCase();
    this.#carouselContainer.innerHTML = this.#generateCarouselHTML(car);
    this.#infoContainer.innerHTML = this.#generateInfoHTML(car, brand);
    if (car.status === "rented" || car.status === "reserved") {
      if (this.#infoContainer.classList.contains("gap"))
        this.#infoContainer.classList.remove("gap");
    } else this.#infoContainer.classList.add("gap");
    //prettier-ignore

    if(active !== 'status')
    this.#footerContainer.innerHTML = this.#generateFooterHTML(car,active);
  }

  #generatePaymentsHTML(pay, i) {
    //prettier-ignore
    return `
        <tr class="table-row"">
            <td class="table-field">${i}</td>
            <td class="table-field">${pay?.date?.split('T')[0]}</td>
            <td class="table-field">${pay.number}</td>
            <td class="table-field">${pay.total}</td>
          </tr>
  `;
  }

  #generateStatusHTML(car, i) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    //prettier-ignore
    return `
        <tr class="table-row"">
            <td class="table-field">${i}</td>
            <td class="table-field">${car.car_id}</td>
            <td class="table-field">${brand}</td>
            <td class="table-field">${car.model.toUpperCase()}</td>
            <td class="table-field">${car.plate_no.toUpperCase()}</td>
            <td class="table-field">${car.region.length<4? car.region.toUpperCase():car.region[0].toUpperCase() + car.region.slice(1).toLowerCase()}</td>
            <td class="table-field">${car.rate}</td>
            <td class="table-field">${car.status.length<4?car.status.toUpperCase():car.status[0].toUpperCase() + car.status.slice(1).toLowerCase()}</td>
               <td class="table-field">
              <button
                class="btn btn-primary btn-view mx-auto"
                data-car-id="${car.car_id}"
                data-bs-toggle="modal"
                data-bs-target="#car-info"
              >
                view
              </button>
            </td>
          </tr>
  `;
  }

  #generateCustomerHTML(customer, i) {
    //prettier-ignore
    return `
        <tr class="table-row"">
            <td class="table-field">${i}</td>
            <td class="table-field">${customer.customer_id}</td>
            <td class="table-field">${customer.fname[0].toUpperCase() + customer.fname.slice(1).toLowerCase()}</td>
            <td class="table-field">${customer.lname[0].toUpperCase() + customer.lname.slice(1).toLowerCase()}</td>
            <td class="table-field">${customer.email.toLowerCase()}</td>
            <td class="table-field">${customer.region[0].toUpperCase() + customer.region.slice(1).toLowerCase()}</td>
            <td class="table-field">${customer.phone_no}</td>
            <td class="table-field">${customer.license_no}</td>
       
            <td class="table-field">
              <button
                class="btn btn-primary btn-delete mx-auto"
                data-customer-id="${customer.customer_id}"
              >
                delete
              </button>
            </td>
          </tr>`;
  }

  #generateReservationsHTML(car, i) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    //prettier-ignore
    return `
        <tr class="table-row"">
            <td class="table-field">${i}</td>
            <td class="table-field">${car.res_id}</td>
            <td class="table-field">${car.car_id}</td>
            <td class="table-field">${car.customer_id}</td>
            <td class="table-field">${brand}</td>
            <td class="table-field">${car.model.toUpperCase()}</td>
            <td class="table-field">${car.plate_no.toUpperCase()}</td>
            <td class="table-field">${car.region}</td>
            <td class="table-field">${car.rate}</td>
            <td class="table-field">${car.pick_date.split("T")[0]}</td>
            <td class="table-field">${car.drop_date.split("T")[0]}</td>
            <td class="table-field">${car.date.split("T")[0]}</td>
            <td class="table-field">${car.status[0].toUpperCase() + car.status.slice(1).toLowerCase()}</td>
            <td class="table-field">${car.res_status[0].toUpperCase() + car.res_status.slice(1).toLowerCase()}</td>
            <td class="table-field">
              <button
                class="btn btn-primary btn-view mx-auto"
                data-car-id="${car.car_id}"
                data-res-id="${car.res_id}"
                data-cust-id="${car.customer_id}"
                data-bs-toggle="modal"
                data-bs-target="#car-info"
              >
                view
              </button>
            </td>
          </tr>
  `;
  }

  #generateCarHTML(car, i) {
    let brand = car.brand;
    brand = brand
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    if (brand.length < 4) brand = brand.toUpperCase();

    //prettier-ignore
    return `
        <tr class="table-row"">
            <td class="table-field">${i}</td>
            <td class="table-field">${car.car_id}</td>
            <td class="table-field">${brand}</td>
            <td class="table-field">${car.model.toUpperCase()}</td>
            <td class="table-field">${car.plate_no.toUpperCase()}</td>
            <td class="table-field">${
              car.type[0].toUpperCase() + car.type.slice(1).toLowerCase()
            }</td>
            <td class="table-field">${car.year}</td>
            <td class="table-field">${car.seating}</td>
            <td class="table-field">${car.transmission[0].toUpperCase() + car.transmission.slice(1).toLowerCase()}</td>
            <td class="table-field">${car.rate}</td>
            <td class="table-field">${car.region}</td>
            <td class="table-field">${car.powertrain[0].toUpperCase() + car.powertrain.slice(1).toLowerCase()}</td>
            <td class="table-field">${car.color[0].toUpperCase() + car.color.slice(1).toLowerCase()}</td>
            <td class="table-field">${car.status.length<4?car.status.toUpperCase():car.status[0].toUpperCase() + car.status.slice(1).toLowerCase()}</td>
            <td class="table-field">
              <button
                class="btn btn-primary btn-view mx-auto"
                data-car-id="${car.car_id}"
                data-res-id="${car.res_id}"
                data-cust-id="${car.customer_id}"
                data-bs-toggle="modal"
                data-bs-target="#car-info"
              >
                view
              </button>
            </td>
          </tr>
  `;
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
                <div class="info-text">${car.plate_no}</div>
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
                  <div class="info-text"><span class="text-sub">reserve date</span>${
                    car.date.split("T")[0]
                  }</div>
                </div>

                <div class="field info-date">
                  <div class="info-icon me-3">
                    <ion-icon name="calendar"></ion-icon>
                  </div>
                  <div class="info-text me-2"><span class="text-sub">pick-up date</span>${car.pick_date.split('T')[0]}</div>
                  <div class="info-text"><span class="text-sub">drop-off date</span>${car.drop_date.split('T')[0]}</div>
                </div>

                <div class="field info-order">
                  <div class="info-icon me-3">
                    <ion-icon name="cube"></ion-icon>
                  </div>
                  <div class="info-text me-2"><span class="text-sub">reservation number</span>${car.res_id}</div>
                </div>
              `
                   : ""
               }

              ${car.status === "reserved" || car.status === "rented" ? `` : ""}
    `;
  }

  #generateFooterHTML(car, active) {
    if (
      active === "reservations" &&
      (car.status === "active" || car.status === "oos")
    )
      return "";
    let type;

    if (car.status === "reserved") type = "revoke";

    if (car.status === "rented") type = "return";

    if (car.status === "active") type = "suspend";

    if (car.status === "oos") type = "activate";

    if (!type) return "";

    return `<button type="button"  class="btn btn-primary btn-${type}">${type}</button>`;
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

  renderForm() {
    this.#num.classList.add("hide");
    this.#addContainer.innerHTML = `
     <div class="customer-title">
            Enter car info <span class="text-sub">(case insensitive)</span>
          </div>
          <form class="car-form needs-validation" novalidate>
            <div class="input-group">
              <span class="input-group-text" id="brand-addon">Brand</span>
              <input
                type="text"
                class="form-control"
                placeholder="mercedes"
                name="brand"
                aria-describedby="brand-addon"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid model name.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="model-addon">Model</span>
              <input
                type="text"
                class="form-control"
                placeholder="g-class"
                name="model"
                aria-describedby="model-addon"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid model name.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="type-addon">Type</span>
              <input
                type="text"
                class="form-control"
                placeholder="sedan"
                name="type"
                aria-describedby="type-addon"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid type name.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="model-addon">Color</span>
              <input
                type="text"
                class="form-control"
                placeholder="black"
                name="color"
                aria-describedby="model-addon"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid color.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="plate-addon"
                >Plate Number</span
              >
              <input
                type="text"
                class="form-control"
                placeholder="5e4322"
                name="plate_no"
                aria-describedby="plate-addon"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid plate number.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="year-addon"
                >Manufacture Year</span
              >
              <input
                type="number"
                class="form-control"
                placeholder="2020"
                name="year"
                aria-describedby="year-addon"
                min="1965"
                max="2023"
                required
              />
              <div class="invalid-feedback">Please provide a valid year.</div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="seating-addon">Seating</span>
              <input
                type="number"
                class="form-control"
                placeholder="2"
                name="seating"
                aria-describedby="seating-addon"
                min="2"
                max="14"
                required
              />
              <div class="invalid-feedback">
                Please provide a valid seating.
              </div>
            </div>

            <div class="input-group">
              <label class="input-group-text" for="transmission"
                >Gear Transmission</label
              >
              <select class="form-select" name="transmission" required>
                <option selected disabled value="">-</option>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="cvt">CVT</option>
              </select>

              <div class="invalid-feedback">
                Please choose a valid transmission.
              </div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="rate-addon">Rate/Day</span>
              <input
                type="number"
                class="form-control rate"
                placeholder="1200"
                min = "0"
                max ="8000"
                name="rate"
                aria-describedby="rate-addon"
                required
              />
              <span class="input-group-text end-group">$</span>
              <div class="invalid-feedback">Please provide a valid rate.</div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="region-addon">Region</span>
              <input
                type="text"
                class="form-control"
                placeholder="egypt"
                name="region"
                aria-describedby="region-addon"
                required
              />
              <div class="invalid-feedback">Please provide a valid region.</div>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="powertrain-addon">Powertrain</span>
              <input
                type="text"
                class="form-control"
                placeholder="fuel"
                name="powertrain"
                aria-describedby="powertrain-addon"
                required
              />
              <div class="invalid-feedback">Please provide a valid powertrain.</div>
            </div>

            <button type="submit" class="btn btn-primary mt-5">submit</button>
          </form>
          <div class="add-footer mt-3">
          Refer to this 
          <a target="_blank" href ="https://suite.imagin.studio/?&customer=egalexandria-university-faculty-of-engineering">link</a> for cars information
          </div>
          <div class="add-footer">
          Note: Some cars may not have the chosen color in its image after adding due to lack of models
          </div>
    `;
  }

  toggle() {
    this.#table.classList.toggle("hide");
    this.#addContainer.classList.toggle("hide");
  }
}

export default new TableView();
