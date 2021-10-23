// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Route
app.post("/add", (req, res) => {
  projectData = {
    temp: req.body.temp,
    country: req.body.country,
    cloud: req.body.cloud,
  };
  res.send(projectData);
  console.log(projectData);
});

// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`Your server is running in port: ${port}`);
}
