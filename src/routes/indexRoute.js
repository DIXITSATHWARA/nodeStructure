"use strict";

const api = require('express').Router();

const unAuthenticate = require("./unauthenticatedRoute")
api.use("/auth", unAuthenticate);

const APIMiddleware = require("../middleware/APIMiddleware");
api.use(APIMiddleware);

const users = require("./userRoute")
api.use("/users", users);

module.exports = api;