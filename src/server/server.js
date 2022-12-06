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

// Setup Server
const port = 8000;

const server = app.listen(port, () =>
  console.log(`Server is running on localhost: ${port}`)
);

// GET Route

app.get("/", (req, res) => res.send("Hello"));

//  POST Route

app.post("/add", (req, res) => {
  console.log(projectData);
});
