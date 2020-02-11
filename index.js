require("dotenv").config();
const chalk = require("chalk");
// Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");

// Initalize App
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Logger
app.use(morgan("combined"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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

//   ROUTES

app.use("/api/auth", require("./routes/api/auth/auth"));
app.use("/api/checkout", require("./routes/api/checkout/checkout"));

// Listner
app.listen(process.env.PORT, () => {
  console.log(
    chalk.bgGreen.black(` Server Running on PORT: ${process.env.PORT} `)
  );
});
