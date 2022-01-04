"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const db = require("./db/db");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require('path');
const req = require("express/lib/request");

global.jwt = require("jsonwebtoken");

db.connection.then(console.log("success")).catch(e => console.log(e));

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(bodyParser.json({
    limit: '50mb'
  }));
  // parse application/x-www-form-urlencoded
  
app.use(logger('dev', {
    skip: function (req , res) { return req.originalUrl.includes("/static/"); }
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, access_token, access_token_x, access_token_c, flag"
    );
    next();
  });

const api = require("./routes/indexRoute");
app.use("/api/v1/",api)

app.listen(PORT, () => console.log("Application running on port number ", PORT))