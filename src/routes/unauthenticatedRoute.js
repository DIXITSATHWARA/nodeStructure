"use strict";

const {
    checkSchema
} = require("express-validator");

const auth = require("express").Router();
const unauthenticatedController = require("../controlles/unauthenticatedController");

auth.post("/signup", checkSchema({
    firstName:{
        isString: true
    },
    lastName:{
        isString: true
    },
    email:{
        isEmail: true
    },
    password:{
        isString: true
    },
    phone:{
        isNumeric: true
    }
}), unauthenticatedController.signUp);


module.exports = auth