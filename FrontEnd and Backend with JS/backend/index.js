const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const gameRouter = require("./routes/gameRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

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

///////////////////////////////////////////////////////////////////////////////////////////

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use("/api/v1/img", express.static(`${__dirname}/img`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Hello from the middleware");
  next();
});

app.use("/api/v1/games", gameRouter);
app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}!`);
});
