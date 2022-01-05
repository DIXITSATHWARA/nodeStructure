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
    emailAddress:{
        isEmail: true
    },
    password:{
        isString: true
    },
    phone:{
        isNumeric: true
    }
}), unauthenticatedController.signUp);

auth.post("/signin", checkSchema({
    
    emailAddress:{
        isEmail: true
    },
    password:{
        isString: true
    }
}), unauthenticatedController.signIn);

auth.post("/check", unauthenticatedController.check);

auth.post("/signout", unauthenticatedController.signout);

module.exports = auth