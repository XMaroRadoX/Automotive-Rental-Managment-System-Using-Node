const users = [
  {
    id: 1671498239235,
    fname: "Wyatt",
    lname: "Beck",
    email: "wyatt.beck@example.com",
    password: "frank",
    phone_no: "01-6513-2013",
    license: "5E4EEF",
    region: "Australia",
    ncars: 10,
    debt: 300,
    transactions: 1200,
  },
  {
    id: "34e270961f",
    fname: "Borislav",
    lname: "Tišma",
    email: "borislav.tisma@example.com",
    password: "emmanuel",
    phone_no: "022-3431-670",
    license: "D43057",
    region: "Serbia",
    ncars: 10,
    debt: 300,
    transactions: 1200,
  },
  {
    id: 1671498246235,
    fname: "Alexandre",
    lname: "Singh",
    email: "alexandre.singh@example.com",
    password: "seven",
    phone_no: "A64 P41-5741",
    license: "32CF62",
    region: "Canada",
    ncars: 10,
    debt: 300,
    transactions: 1200,
  },
  {
    id: 1671498242235,
    fname: "یاسمن",
    lname: "صدر",
    email: "ysmn.sdr@example.com",
    password: "newman",
    phone_no: "055-53625106",
    license: "DD1246",
    region: "Iran",
    ncars: 10,
    debt: 300,
    transactions: 1200,
  },
];

const data = [
  {
    carId: "1234",
    brand: "bmw",
    model: "x6",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12142",
    color: "red",
    region: "egypt",
    cca3: "egy",
    cca2: "eg",
    powertrain: "electric",
    status: "active",
  },
  {
    carId: "12223422",
    brand: "audi",
    model: "a4",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12141212",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "active",
  },
  {
    carId: "12223422",
    brand: "bmw",
    model: "i3",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12141212",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "active",
  },
  {
    carId: "1234212112",
    brand: "mercedes",
    type: "sedan",
    model: "g-class",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12142",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "active",
  },
];

const favs = [
  {
    carId: "12223422",
    brand: "bmw",
    model: "i3",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12141212",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "active",
  },
  {
    carId: "123412",
    brand: "audi",
    model: "a3",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12112142",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "electric",
    status: "oos",
  },
];

const rev = [
  {
    carId: "34e270961f",
    resId: "34e270961f",
    custId: "34e270961f",
    custName: "Amr Yasser",
    brand: "bentley",
    type: "sedan",
    model: "bentayga",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12142",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "reserved",
    pickup: "2022-12-15",
    drop: "2022-12-15",
    date: "2022-12-15",
  },
  {
    carId: "12223422",
    resId: "12392222",
    custId: "211221",
    custName: "Amr Yasser",
    brand: "kia",
    model: "carens",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12141212",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "active",
    pickup: "2022-11-15",
    drop: "2022-12-15",
    date: "2022-11-15",
  },
];

const ren = [
  {
    carId: "123219",
    resId: "12392111122111",
    custId: "211221",
    brand: "jeep",
    type: "sedan",
    model: "wrangler",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    plateNo: "12142",
    color: "black",
    region: "usa",
    cca3: "usa",
    cca2: "us",
    powertrain: "fuel",
    status: "rented",
    pickup: "2022-12-15",
    drop: "2022-12-15",
    date: "2022-12-15",
  },
];

const pays = [
  {
    pickup: "2022-12-15",
    drop: "2022-12-15",
    return: "2022-12-15",
    brand: "bmw",
    model: "x6",
    carId: "1221",
    rate: 250,
    duration: 5,
    orderId: "12123",
    payment: 2122,
    status: false,
    method: "",
  },
  {
    pickup: "2022-12-15",
    drop: "2022-12-15",
    return: "2022-12-15",
    payDate: "2022-12-15",
    brand: "bmw",
    model: "x6",
    carId: "1221",
    rate: 250,
    duration: 5,
    method: "cash",
    orderId: "1212223",
    payment: 2122,
    status: true,
  },
  {
    pickup: "2022-12-15",
    drop: "2022-12-15",
    return: "2022-12-15",
    payDate: "2022-12-15",
    brand: "bmw",
    model: "x6",
    carId: "1221",
    rate: 250,
    duration: 5,
    method: "cash",
    orderId: "12122212123",
    payment: 2122,
    status: false,
  },
];

const mysql = require("mysql");
const session = require("express-session");
const path = require("path");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  database: process.env.database,
  password: process.env.password,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const getId = function () {
  return uuid().split("-").join("").slice(0, 10);
};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

app.use(express.static(__dirname + "/app"));

// GET Routes

// home page
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/app/index.html"));
});

// register page
app.get("/createAccount", function (request, response) {
  response.sendFile(path.join(__dirname + "/app/register.html"));
});

// http://localhost:3000/home
app.get("/home", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    console.log("sss");
    response.sendFile(path.join(__dirname + "/app/customer.html"));
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  // response.end();
});

app.get("/adminData", (req, res) => {
  // TODO CONNECT TO DB, GET ALL CARS, GET ALL RESERVATIONS WITH EACH CAR INFO, GET ALL USERS, GET ALL FILTERS
  try {
    const response = {
      cars: [...rev, ...ren, ...data],
      rev,
      ren,
      users,
      filters: [
        {
          name: "powertrain",
          categories: [
            { name: "fuel", count: 5 },
            { name: "gas", count: 10 },
            { name: "electric", count: 1 },
          ],
        },
        {
          name: "type",
          categories: [
            { name: "coupe", count: 5 },
            { name: "sedan", count: 10 },
            { name: "sport", count: 1 },
          ],
        },
        {
          name: "color",
          categories: [
            { name: "red", count: 5 },
            { name: "black", count: 10 },
          ],
        },
        {
          name: "brand",
          categories: [
            { name: "bmw", count: 5 },
            { name: "aston martin", count: 11 },
          ],
        },
        {
          name: "transmission",
          categories: [
            { name: "automatic", count: 5 },
            { name: "cvt", count: 11 },
          ],
        },
      ],
    };
    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

app.get("/data", (req, res) => {
  // TODO CONNECT TO DB, GET ALL AVAILABLE CARS, GET ALL RESERVED/RENTED CARS WITH EACH CAR INFO, GET ALL USERS, GET ALL FILTERS

  try {
    const response = {
      cars: data.filter((c) => c.status !== "oos"),
      favs,
      rev,
      ren,
      filters: [
        {
          name: "powertrain",
          categories: [
            { name: "fuel", count: 5 },
            { name: "gas", count: 10 },
            { name: "electric", count: 1 },
          ],
        },
        {
          name: "type",
          categories: [
            { name: "coupe", count: 5 },
            { name: "sedan", count: 10 },
            { name: "sport", count: 1 },
          ],
        },
        {
          name: "color",
          categories: [
            { name: "red", count: 5 },
            { name: "black", count: 10 },
          ],
        },
        {
          name: "brand",
          categories: [
            { name: "bmw", count: 5 },
            { name: "aston martin", count: 11 },
          ],
        },
        {
          name: "transmission",
          categories: [
            { name: "automatic", count: 5 },
            { name: "cvt", count: 11 },
          ],
        },
      ],
    };
    res.json(response);
  } catch (e) {
    console.log(e);
  }
});

app.get("/payments", (req, res) => {
  // TODO CONNECT TO DB, GET ALL PAYMENTS
  res.json(pays);
});

app.post("/addCar", (req, res) => {
  const id = getId();

  // TODO CONNECT TO DB, INSERT NEW CAR

  console.log(req.body);

  res.sendStatus(200);
});

//  POST Route
app.post("/register", function (request, response) {
  console.log("register request", request.body);

  // Get new user data and generated ID
  const data = request.body;
  const id = getId();

  // Generate query
  const query = `
    insert into customer(id,email,password,fname,lname,phone_no,license_no,region,limit) 
                values("${id}","${data.email}","${data.password}","${data.fname}","${data.lname}","${data.phone_no}","${data.license_no}","${data.region}",3);
  `;

  try {
    // TODO CONNECT TO DB AND RUN INSERT QUERY
    response.sendStatus(200);
  } catch (e) {
    response.sendStatus(500);
  }
});

app.post("/signIn", function (request, response) {
  const data = request.body;
  console.log(data);
  const query = `
    select fname,customer_id from customer where email = "${data.email}" and \`password\` = sha1("${data.password}")
  `;

  // TODO CONNECT TO DB AND SEARCH FOR ACCOUNT AND GET LIMIT
  connection.query(query, (err, rows) => {
    try {
      if (err) throw err;
      request.session.loggedin = true;
      request.session.userId = rows[0].customer_id;
      request.session.name = rows[0].fname;

      request.session.limit = 3;

      console.log(request.session);
      response.sendStatus(200);
    } catch (error) {
      console.log(error);
      response.sendStatus(404);
    }
  });

  // console.log(rows);

  // if found
  // request.session.loggedin = true;
  // request.session.userId = customer_id;
  // request.session.limit = limit;
});

app.post("/signOut", function (request, response) {
  console.log("signout request", req.body);

  if (request.session.loggedin) {
    request.session.loggedin = false;
    request.session.userId = "";
    response.sendStatus(200);
  }

  response.sendStatus(500);
});

app.post("/dailyPayments", (request, response) => {
  const period = request.body.period;
  const [d1, d2] = period.split("-").map((d) => d.trim());

  // TODO CONNECT TO DB AND GET PAYMENTS WITHIN [D1,D2]

  const data = [
    {
      date: "2022-12-15",
      number: 5,
      total: 1221121,
    },
  ];
  response.json(data);
});

app.post("/addFavourite", function (req, res) {
  const id = req.body.id;
  // TODO CONNECT TO DB AND CAR ID TO USER FAVOURITES

  console.log(id);
  res.sendStatus(200);
});

app.post("/removeFavourite", function (req, res) {
  const id = req.body.id;
  // TODO CONNECT TO DB REMOVE CAR ID FROM USER FAVOURITES

  console.log(id);

  res.sendStatus(200);
});

app.post("/pickCar", function (request, response) {
  const id = request.body.id;
  const order = request.body.order;
  // TODO CONNECT TO DB SET CAR STATUS TO RENTED

  console.log("reserve pick request", order, id);

  response.sendStatus(200);
});

app.post("/revokeCar", function (request, response) {
  const id = request.body.id;
  const order = request.body.order;

  // TODO CONNECT TO DB SET CAR STATUS TO ACTIVE AND DELETE RESERVATION AND INCREASE USER LIMIT
  console.log("reserve revoke request", id, order);

  response.sendStatus(200);
});

app.post("/returnCar", function (request, response) {
  const id = request.body.id;
  const order = request.body.order;
  const date = request.body.date; // return date

  // TODO CONNECT TO DB SET CAR STATUS TO ACTIVE, CREATE THE PAYMENT,UPDATE ORDER STATUS AND INCREASE USER LIMIT
  console.log("return request", id, order, date);

  response.sendStatus(200);
});

app.post("/reserveCar", function (request, response) {
  //   data: {
  //   pick_date: '2022-12-15',
  //   pick_place: 'ass',
  //   drop_date: '2022-12-30',
  //   drop_place: 'asas',
  //   carId: '1234',
  //   date: '2022-12-25'
  // }
  const resId = getId();

  // if (request.session.limit > 0) {
  // }

  // TODO CONNECT TO DB SET CAR STATUS TO RESERVED, CREATE THE RESERVATION AND DECREASE USER LIMIT
  console.log("reserve request", request.body);

  response.json(resId);
});

app.post("/pay", function (request, response) {
  // { order: '12122212123', car: '1221', method: 'credit card' }
  // TODO CONNECT TO DB SET PAYMENT STATUS TO PAID

  console.log("pay request", req.body);
  response.sendStatus(200);
});

app.post("/suspendCar", function (request, response) {
  // TODO CONNECT TO DB SET CAR STATUS TO OOS

  const id = request.body;
  console.log("suspend request", id);

  response.sendStatus(200);
});

app.post("/activateCar", function (request, response) {
  // TODO CONNECT TO DB SET CAR STATUS TO ACTIVE

  const id = req.body;
  console.log("activate request", id);

  res.sendStatus(200);
});

app.post("/deleteCustomer", function (request, response) {
  // TODO CONNECT TO DB DELETE CUSTOMER

  const id = req.body;
  console.log("delete customer request", id);

  response.sendStatus(200);
});

app.post("/daily", (req, res) => {
  // TODO CONNECT TO DB AND GET REPORT WITH GIVEN DATE

  console.log(req.body.date);
  const date = req.body.date;
  const response = {
    date,
    data: data,
  };

  res.json(response);
});

// Setup Server
const port = 8000;

const server = app.listen(port, () =>
  console.log(`Server is running on localhost: ${port}`)
);
