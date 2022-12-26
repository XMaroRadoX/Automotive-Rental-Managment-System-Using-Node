export const SERVER_URL = "http://localhost:8000";

export const CAR_HEAD = `
            <th class="table-field">#</th>
            <th class="table-field">ID</th>
            <th class="table-field">Brand</th>
            <th class="table-field">Model</th>
            <th class="table-field">Plate number</th>
            <th class="table-field">Type</th>
            <th class="table-field">year</th>
            <th class="table-field">seating</th>
            <th class="table-field">transmission</th>
            <th class="table-field">rate/day</th>
            <th class="table-field">region</th>
            <th class="table-field">powertrain</th>
            <th class="table-field">color</th>
            <th class="table-field">status</th>
            <th class="table-field">actions</th>
          `;

export const CUSTOMER_HEAD = `
            <th class="table-field">#</th>
            <th class="table-field">ID</th>
            <th class="table-field">first name</th>
            <th class="table-field">last name</th>
            <th class="table-field">email</th>
            <th class="table-field">region</th>
            <th class="table-field">phone number</th>
            <th class="table-field">license number</th>
            <th class="table-field">reserved/rented</th>
            <th class="table-field">debt</th>
            <th class="table-field">transactions</th>
            <th class="table-field">actions</th>
          `;

export const RESERVATIONS_HEAD = `
            <th class="table-field">#</th>
            <th class="table-field">order number</th>
            <th class="table-field">car id</th>
            <th class="table-field">customer id</th>
            <th class="table-field">customer name</th>
            <th class="table-field">brand</th>
            <th class="table-field">model</th>
            <th class="table-field">plate Number</th>
            <th class="table-field">region</th>
            <th class="table-field">rate/day</th>
            <th class="table-field">pick-up date</th>
            <th class="table-field">drop-off date</th>
            <th class="table-field">order date</th>
            <th class="table-field">status</th>
            <th class="table-field">Info</th>
          `;

export const STATUS_HEAD = `
            <th class="table-field">#</th>
            <th class="table-field">car id</th>
            <th class="table-field">brand</th>
            <th class="table-field">model</th>
            <th class="table-field">plate Number</th>
            <th class="table-field">region</th>
            <th class="table-field">rate/day</th>
            <th class="table-field">status</th>
            <th class="table-field">info</th>
          `;

export const PAYMENTS_HEAD = `
            <th class="table-field">#</th>
            <th class="table-field">Date</th>
            <th class="table-field">number of transactions</th>
            <th class="table-field">total amount</th>
          `;
