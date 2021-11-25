const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
require("../config/axios");

require("./db.js");

const server = express();

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, _req, res) => {
  // eslint-disable-line no-unused-vars
  const errorStatus = err.status || 500
  console.error(err);
  if (errorStatus === 500) {
    res
      .status(errorStatus)
      .json({ error: "An error with the server has ocurred" });
  } else {
    const message = err.message || err;
    res.status(errorStatus).json({ error: message });
  }
});

module.exports = server;
