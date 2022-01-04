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

// (async function () {
//   global.conn = require('./db/db'); // Connect another database
//   global.db = await db.connection.catch(e => console.log(e)); // connect current database
// })();

app.use(cookieParser());

app.use(bodyParser.json());
  
app.use(logger('dev', {
  skip: function (req, res) { return req.originalUrl.includes("/static/"); }
}))

const api = require("./routes/indexRoute");
app.use("/api/v1/",api)

app.listen(PORT, () => console.log("Application running on port number ", PORT))