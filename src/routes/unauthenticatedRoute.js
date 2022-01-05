"use strict";

const {
    checkSchema
} = require("express-validator");

const multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

const auth = require("express").Router();
const unauthenticatedController = require("../controlles/unauthenticatedController");

auth.post("/signup", upload.single('profilePicture'), checkSchema({
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