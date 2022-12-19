// Setup empty JS object to act as endpoint for all routes
// projectData = { length: 0 };

const data = [
  {
    id: "1234",
    brand: "bmw",
    model: "x6",
    type: "coupe",
    year: 2020,
    seating: 4,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "red",
    region: "USA",
    cca3: "usa",
    cca2: "us",
    power: "fuel",
    status: "active",
  },
  {
    id: "1235",
    brand: "aston martin",
    type: "sedan",
    model: "db11",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "red",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
  {
    id: "1236",
    brand: "mercedes",
    type: "sedan",
    model: "e-class",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
  {
    id: "1237",
    brand: "mercedes",
    type: "sedan",
    model: "g-class",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
  {
    id: "1268",
    brand: "kia",
    type: "sport",
    model: "carens",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "blue",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
];

const favs = [
  {
    id: "1236",
    brand: "mercedes",
    type: "sedan",
    model: "e-class",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
  {
    id: "1237",
    brand: "mercedes",
    type: "sedan",
    model: "g-class",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "active",
  },
];

const rev = [
  {
    id: "1239",
    brand: "bentley",
    type: "sedan",
    model: "bentayga",
    year: 2020,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "electric",
    status: "reserved",
  },
];

const ren = [
  {
    id: "1249",
    brand: "jeep",
    type: "sedan",
    model: "wrangler",
    year: 2018,
    seating: 2,
    transmission: "automatic",
    description: "",
    rate: 400,
    color: "black",
    region: "Egypt",
    cca3: "egy",
    cca2: "eg",
    power: "fuel",
    status: "rented",
  },
];

const pays = [
  {
    pickup: "2022-12-15T00:00",
    drop: "2022-12-15T00:00",
    return: "2022-12-15T00:00",
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
    pickup: "2022-12-15T00:00",
    drop: "2022-12-15T00:00",
    return: "2022-12-15T00:00",
    payDate: "2022-12-15T00:00",
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
    pickup: "2022-12-15T00:00",
    drop: "2022-12-15T00:00",
    return: "2022-12-15T00:00",
    payDate: "2022-12-15T00:00",
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
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// GET Route

app.get("/", (req, res) => res.json("Hello"));

app.get("/cars", (req, res) => {
  try {
    const response = {
      cars: data,
      favs,
      rev,
      ren,
      filters: [
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

app.get("/payments", (req, res) => res.json(pays));

//  POST Route
app.post("/addFavourite", function (req, res) {
  const id = req.body.id;
  let car;
  if ((car = data.findIndex((c) => c.id === id)) > -1) favs.push(data[car]);

  if ((car = rev.findIndex((c) => c.id === id)) > -1) favs.push(rev[car]);

  if ((car = ren.findIndex((c) => c.id === id)) > -1) favs.push(ren[car]);

  console.log(favs);
  res.sendStatus(200);
});

app.post("/removeFavourite", function (req, res) {
  const id = req.body.id;
  const car = favs.findIndex((c) => c.id === id);

  favs.splice(car, 1);
  console.log(favs);

  res.sendStatus(200);
});

app.post("/pickCar", function (req, res) {
  const id = req.body.id;
  console.log("reserve pick request", id);

  res.sendStatus(200);
});

app.post("/revokeCar", function (req, res) {
  const id = req.body.id;
  console.log("reserve revoke request", id);

  res.sendStatus(200);
});

app.post("/reserveCar", function (req, res) {
  const id = req.body;
  console.log("reserve request", id);

  res.sendStatus(200);
});

app.post("/pay", function (req, res) {
  const id = req.body.id;
  console.log("pay request", req.body);
  const index = pays.findIndex((p) => p.orderId === id);
  if (index == -1) res.sendStatus(404);
  pays[index].status = true;
  pays[index].method = req.body.method;
  res.sendStatus(200);
});

app.post("/signout", function (req, res) {
  console.log("signout request", req.body);
  res.sendStatus(200);
});

// Setup Server
const port = 8000;

const server = app.listen(port, () =>
  console.log(`Server is running on localhost: ${port}`)
);
