"use strict";

const {
    validationResult
} = require("express-validator");

const jwt = require("jsonwebtoken")
const {
    userModel
} = require("../db/schema/usersSchema")
const {
    encryptPassword,
    checkPassword
} = require("../utiles/common");
const ObjectId = require("mongoose").Types.ObjectId;


exports.users = async (req, res) => {
    try {
        return res.json("sss");

    } catch (error) {
        console.log(error);
        return res.json({
            error: error.array()
        });
    }
}


