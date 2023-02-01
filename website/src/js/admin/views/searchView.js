"use strict";

import { changeCat } from "../controller.js";

class SearchView {
  searchContainer = document.querySelector(".table-filter");

  renderReservationsSearch() {
    this.searchContainer.innerHTML = `
 <div class="reservations-filter">
            <div class="customer-title">
              Search reservations by
              <span class="text-sub">(case insensitive)</span>
            </div>

            <div class="input-group">
              <span class="input-group-text" id="res-id">Reservation ID</span>
              <input
                type="text"
                class="form-control"
                id="res_id"
                aria-describedby="res-id"
                placeholder="12345"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="car-id">Car ID</span>
              <input
                type="text"
                class="form-control"
                id="car_id"
                aria-describedby="car-id"
                placeholder="12345"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="cust-id">Customer ID</span>
              <input
                type="text"
                class="form-control"
                id="customer_id"
                aria-describedby="cust-id"
                placeholder="12345"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="cust-name">Reservation status</span>
              <input
                type="text"
                class="form-control"
                id="res_status"
                aria-describedby="cust-name"
                placeholder="active"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="plate-id">Plate Number</span>
              <input
                type="text"
                class="form-control"
                id="plate_no"
                aria-describedby="plate-id"
                placeholder="5E4333"
              />
            </div>

        

            <div class="input-group">
              <span class="input-group-text" id="pick-date">Pick-up Date</span>
              <input
                type="date"
                class="form-control"
                id="pick_date"
                aria-describedby="pick-date"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="drop-date">Drop-off Date</span>
              <input
                type="date"
                class="form-control"
                id="drop_date"
                aria-describedby="drop-date"
              />
            </div>

            <div class="input-group">
              <span class="input-group-text" id="range-date"
                >Reservation Date</span
              >
              <input
                type="date"
                class="form-control"
                id="date"
                aria-describedby="res-date"
              />
            </div>

            <div class="input-group range">
              <span class="input-group-text" id="range-date"
                >Reservation Date Range</span
              >
              <input
                type="text"
                class="form-control"
                name="daterange"
                id="range"
                value=""
                aria-describedby="range-date"
              />
            </div>

    
            <button
              type="button"
              class="btn btn-outline-primary btn-clear-search"
            >
              clear
            </button>

            <button type="button" class="btn btn-primary btn-search">
              Search
            </button>
          </div>
    `;
  }

  //  <div class="input-group ">
  //           <span class="input-group-text" id="res/ren">Reserved/Rented</span>
  //           <input
  //             type="number"
  //             class="form-control"
  //             id="ncars"
  //             aria-describedby="res/ren"
  //             placeholder="5"
  //           />
  //         </div>

  //         <div class="input-group ">
  //           <span class="input-group-text" id="debt-no">Debt</span>
  //           <input
  //             type="number"
  //             class="form-control"
  //             id="debt"
  //             aria-describedby="debt-no"
  //             placeholder="5"
  //           />
  //         </div>

  //         <div class="input-group ">
  //           <span class="input-group-text" id="transactions-no"
  //             >Transactions</span
  //           >
  //           <input
  //             type="number"
  //             class="form-control"
  //             id="transactions"
  //             aria-describedby="transactions-no"
  //             placeholder="5"
  //           />
  //         </div>

  renderCustomerSearch() {
    this.searchContainer.innerHTML = `
    <div class="customer-filter">
            <div class="customer-title">
              Search customers by
              <span class="text-sub">(case insensitive)</span>
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="cust-id">ID</span>
              <input
                type="text"
                class="form-control"
                id="customer_id"
                aria-describedby="cust-id"
                placeholder="123456789"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="first-name">First Name</span>
              <input
                type="text"
                class="form-control"
                id="fname"
                aria-describedby="first-name"
                placeholder="amr"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="last-name">Last Name</span>
              <input
                type="text"
                class="form-control"
                id="lname"
                aria-describedby="last-name"
                placeholder="yasser"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="mail">Email</span>
              <input
                type="text"
                class="form-control"
                id="email"
                aria-describedby="mail"
                placeholder="example@example.com"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="country">Region</span>
              <input
                type="text"
                class="form-control"
                id="region"
                aria-describedby="country"
                placeholder="egypt"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="phone">Phone Number</span>
              <input
                type="text"
                class="form-control"
                id="phone_no"
                aria-describedby="phone"
                placeholder="012-893-960-52"
              />
            </div>

            <div class="input-group ">
              <span class="input-group-text" id="license-no"
                >License Number</span
              >
              <input
                type="text"
                class="form-control"
                id="license_no"
                aria-describedby="license-no"
                placeholder="5e4322"
              />
            </div>


            <button
              type="button"
              class="btn btn-outline-primary btn-clear-search"
            >
              clear
            </button>

            <button type="button" class="btn btn-primary btn-search">
              Search
            </button>
          </div>
    `;
  }

  renderStatusSearch() {
    this.searchContainer.innerHTML = `
      <div class="status-filter">
            <div class="customer-title">
              Search status by day
            </div>

            <div class="input-group">
              <span class="input-group-text" id="status">Date</span>
              <input
                type="date"
                class="form-control"
                id="status-date"
                aria-describedby="status"
              />
            </div>
    
            <button
              type="button"
              class="btn btn-outline-primary btn-clear-search"
            >
              clear
            </button>

            <button type="button" class="btn btn-primary btn-search">
              Search
            </button>
          </div>
    `;
  }

  renderPaymentsSearch() {
    this.searchContainer.innerHTML = `
      <div class="status-filter">
            <div class="customer-title">
              Search payments by period
            </div>

            <div class="input-group range">
              <span class="input-group-text" id="range-date"
                >Period</span
              >
              <input
                type="text"
                class="form-control date-period"
                name="daterange"
                id="range"
                value=""
                aria-describedby="range-date"
              />
            </div>
    
            <button
              type="button"
              class="btn btn-outline-primary btn-clear-search"
            >
              clear
            </button>

            <button type="button" class="btn btn-primary btn-search">
              Search
            </button>
          </div>
    `;
  }

  renderCarSearch() {
    this.searchContainer.innerHTML = `
    <div class="car-filter">
            <div class="car-filter-text">status</div>
            <div class="form-check car-filter-btns">
              <input
                type="radio"
                class="btn-check"
                name="options-outlined"
                id="all"
                autocomplete="off"
                checked
              />
              <label class="btn btn-outline-primary" for="all">All</label>
              <input
                type="radio"
                class="btn-check"
                name="options-outlined"
                id="reserved"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="reserved"
                >reserved</label
              >

              <input
                type="radio"
                class="btn-check btn-car"
                name="options-outlined"
                id="rented"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="rented">rented</label>

               <input
                type="radio"
                class="btn-check btn-car"
                name="options-outlined"
                id="oos"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="oos">out of service</label>
            </div>
          </div>
          
          <div class="car-search mt-4">
            <div class="car-filter-text">
              Search by <span class="text-sub">(case insensitive)</span>
            </div>

            <div class="input-group">
             <span class="input-group-text" id="plate-no">Plate Number</span>
              <input
                type="test"
                class="form-control plateNo"
                placeholder="54E222"
                id="plate_no"
                aria-describedby="plate-no"
              />
            </div>
    
              <div class="input-group">
             <span class="input-group-text" id="car-id">Car ID</span>
              <input
                type="test"
                class="form-control plateNo"
                placeholder="54E222"
                id="car_id"
                aria-describedby="car-id"
              />
            </div>

            <div class="ms-5">
            <button
              type="button"
              class="btn btn-outline-primary btn-clear-search"
            >
              clear
            </button>

            <button type="button" class="btn btn-primary btn-search">
              Search
            </button>
          </div>
          </div>
          </div>
          `;

    document.querySelectorAll(".btn-check").forEach((btn) => {
      btn.addEventListener("change", changeCat.bind(btn));
    });
  }

  toggle() {
    this.searchContainer.classList.toggle("hide");
  }
}
export default new SearchView();
