require("dotenv").config();
const chalk = require("chalk");
// Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// Initalize App
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Logger
app.use(morgan("combined"));

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(chalk.bgBlueBright.black(` MongoDB Connected `));
  })
  .catch(err => {
    console.log(chalk.bgRedBright.black(` MongoDB Error: ${err} `));
  });

// Listner
app.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.black(` Server Running on PORT: ${process.env.PORT} `)
  );
});
