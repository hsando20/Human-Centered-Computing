//Index.js
//Adds the imports required to the functionality of the API
//and the core base for the backend

const fs = require("fs"); //Allows to handle files
const express = require("express"); // Layer that makes the handle of the server efficient
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// importing the routes
const gameRouter = require("./routes/gameRoutes");
const userRouter = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express(); // execute the server

/////////////////////////    DATABASE CONNECTION    //////////////////////////////////////
const database = process.env.DATABASE.replace(
  "<USER>",
  process.env.DATABASE_USER
)
  .replace("<PASSWORD>", process.env.DATABASE_PASSWORD)
  .replace("<COLLECTION>", process.env.DATABASE_COLLECTION);

mongoose.connect(database);

///////////////////////////////////    CORS    ///////////////////////////////////////////
const whitelist = process.env.CORS_WHITELIST.split(",");
const corsOptions = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors());

/////////////////////////////////MiddleWare//////////////////////////////////////

app.use(morgan("dev")); // Shows in Console the request
app.use(express.json()); //Converts the json in an object for JS to understand
app.use("/api/v1/img", express.static(`${__dirname}/img`)); // Gets the image folders and deploys in the Api
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Hello from the middleware");
  next();
}); //Saves the request time

//Creates the routes for the API
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/users", userRouter);

//Executes the server in the specified port
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});
