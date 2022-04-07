"use strict";

const {
    checkSchema
} = require("express-validator");


/**
* @description This multer packege is use for uploading the files.
* @param file
* @returns {*}
*/
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

/**
 * @description This route is for signup user and check validation schecma.
 */
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


/**
 * @description This route is for signin user and check validation schecma.
 */
auth.post("/signin", checkSchema({
    
    emailAddress:{
        isEmail: true
    },
    password:{
        isString: true
    }
}), unauthenticatedController.signIn);

/**
 * @description This route is for check user is authorise or token expired.
 */
auth.post("/check", unauthenticatedController.check);


/**
 * @description This route is for signout user.
 */
auth.post("/signout", unauthenticatedController.signout);

module.exports = auth
