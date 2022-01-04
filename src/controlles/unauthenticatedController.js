"use strict";

const {
    validationResult
} = require("express-validator");

const jwt = require("jsonwebtoken")
const {userModel} = require("../db/schema/usersSchema")
const {encryptPassword, checkPassword} = require("../utiles/common");
exports.signUp = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            errors: errors.array()
        });
    }

    const {
        firstName,
        lastName,
        emailAddress,
        password,
        phone
    } = req.body;

    let exist = await userModel.find({
        emailAddress: emailAddress
    })
    
    if(exist.length === 0){
        let signup = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: await encryptPassword(password),
            phone: phone
        });

        if(signup){
            res.json({
                code: 5,
                message: "Registartion successfully" 
            })
        }else{
            res.json({
                code: 0,
                error: "Something went wrong, please try again."
            });    
        }
    }else{
        res.json({
            code: 0,
            error: "User email already exist, please try again."
        });
    }
}

exports.signIn = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({
            errors: errors.array()
        });
    }

    const {
        emailAddress,
        password
    } = req.body;

    let user = await userModel.find({
        emailAddress: emailAddress
    })

    if(user.length > 0){
        let _user = user && user[0]
        let isPssword = await checkPassword(password, _user.password)
        
        if(isPssword){

            let _token = jwt.sign({
                _id: _user._id,
                emailAddress: _user.emailAddress
            }, process.env.JWT_SECRET, {
                expiresIn: "4h"
            }) 

            return res.cookie("access_token", _token, {
                httponly: true
            }).json({
                _user,
                _token
            })
        }else{
            res.json({
                code: 0,
                error: "Something went wrong, please try again."
            });    
        }
    }else{
        res.json({
            code: 0,
            error: "Invalid access, please try again."
        });
    }
}