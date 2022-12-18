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

//  POST Route
// implement fav and reserved favs
app.post("/addFavourite", function (req, res) {
  const id = req.body.id;
  const car = data.findIndex((c) => c.id === id);
  favs.push(data[car]);
  res.sendStatus(200);
});

app.post("/removeFavourite", function (req, res) {
  const id = req.body.id;
  const car = favs.findIndex((c) => c.id === id);
  favs.splice(car, 1);
  res.sendStatus(200);
});

// Setup Server
const port = 8000;

const server = app.listen(port, () =>
  console.log(`Server is running on localhost: ${port}`)
);