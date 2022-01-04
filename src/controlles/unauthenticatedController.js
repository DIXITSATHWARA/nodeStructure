"use strict";

const {
    validationResult
} = require("express-validator");

const userModel = require("../db/schema/usersSchema")

exports.signUp = (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            errors: errors.array()
        });
    }

    res.json(req.body);
}