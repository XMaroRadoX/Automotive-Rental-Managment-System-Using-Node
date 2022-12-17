// Setup empty JS object to act as endpoint for all routes
// projectData = { length: 0 };

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
    const data = [
      {
        id: "1234",
        brand: "volkswagen",
        type: "sport",
        seating: "4",
        transmission: "automatic",
        src: "https://cdn.imagin.studio/getImage?customer=egalexandria-university-faculty-of-engineering&make=kia&modelfamily=carens&modelYear=2018&paintId=pspc0020",
        description: "",
        rate: 400,
        color: "red",
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
      },
      {
        id: "1234",
        brand: "volkswagen",
        type: "sport",
        seating: "4",
        transmission: "automatic",
        src: "https://iili.io/HnM8rdb.webp",
        description: "",
        rate: 400,
        color: "red",
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
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
        region: "Egypt",
        cca3: "egy",
        cca2: "eg",
      },
    ];

    res.json(data);
  } catch (e) {
    console.log(e);
  }
});
//  POST Route

app.get("/addUser", function (req, res) {
  res.send("addUser");
});

// Setup Server
const port = 8000;

const server = app.listen(port, () =>
  console.log(`Server is running on localhost: ${port}`)
);
