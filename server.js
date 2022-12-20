// Setup empty JS object to act as endpoint for all routes
// projectData = { length: 0 };

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
    id: 1671498243235,
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
    power: "electric",
    status: "active",
  },
  {
    carId: "123422",
    brand: "bmw",
    model: "x6",
    type: "coupe",
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
    power: "fuel",
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
    power: "fuel",
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
    power: "electric",
    status: "oos",
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
    power: "fuel",
    status: "active",
  },
];

const favs = [
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
    power: "fuel",
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
    power: "electric",
    status: "oos",
  },
];

const rev = [
  {
    carId: "1239",
    resId: "1239211111",
    custId: "211221",
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
    power: "fuel",
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
    power: "fuel",
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
    custID: "211221",
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
    power: "fuel",
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

app.get("/admin", (req, res) => {
  try {
    const response = {
      cars: [...rev, ...ren, ...data],
      rev,
      ren,
      users,
      filters: [
        {
          name: "power",
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

app.get("/cars", (req, res) => {
  try {
    const response = {
      cars: data.filter((c) => c.status !== "oos"),
      favs,
      rev,
      ren,
      filters: [
        {
          name: "power",
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

app.get("/payments", (req, res) => res.json(pays));

app.post("/addCar", (req, res) => {
  console.log(req.body);

  res.sendStatus(200);
});

//  POST Route

app.post("/dailyPayments", (req, res) => {
  console.log(req.body);
  const data = [
    {
      date: "2022-12-15",
      number: 5,
      total: 1221121,
    },
  ];
  res.json(data);
});

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

app.post("/returnCar", function (req, res) {
  const id = req.body.id;
  console.log("return request", id);

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

app.post("/suspendCar", function (req, res) {
  const id = req.body;
  console.log("suspend request", id);

  res.sendStatus(200);
});

app.post("/activateCar", function (req, res) {
  const id = req.body;
  console.log("activate request", id);

  res.sendStatus(200);
});

app.post("/deleteCustomer", function (req, res) {
  const id = req.body;
  console.log("delete customer request", id);

  res.sendStatus(200);
});

app.post("/signout", function (req, res) {
  console.log("signout request", req.body);
  res.sendStatus(200);
});

app.post("/daily", (req, res) => {
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
