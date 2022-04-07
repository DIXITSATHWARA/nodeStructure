"use strict";

const user = require("express").Router();
const usersController = require("../controlles/usersController");
const {userAuthorization} = require("../middleware/userAuthorization");

/**
 * @description This route is for geting user list.
 */
user.post("/list", userAuthorization((currentUser, req) => {
    console.log(currentUser);
    if(currentUser){
        return true
    }else{
        return false
    }
}),usersController.users);

module.exports = user
