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

/**
 * @description This function is use to signup a new user.
 * @param req
 * @param res
 */
exports.signUp = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({
            errors: errors.array()
        });
    }

    let {
        ..._user
    } = req.body;

    _user.profilePicture = req.file

    let exist = await userModel.find({
        emailAddress: _user.emailAddress
    })

    if (exist.length === 0) {
        let signup = await userModel.create(_user);

        if (signup) {
            res.json({
                code: 5,
                message: "Registartion successfully"
            })
        } else {
            res.json({
                code: 0,
                error: "Something went wrong, please try again."
            });
        }
    } else {
        res.json({
            code: 0,
            error: "User email already exist, please try again."
        });
    }
}

/**
 * @description This function is to signin user.
 * @param req
 * @param res
 */
exports.signIn = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

    if (user.length > 0) {
        let _user = user && user[0]
        let isPssword = await checkPassword(password, _user.password)

        if (isPssword) {

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
        } else {
            res.json({
                code: 0,
                error: "Invalid password, please try again."
            });
        }
    } else {
        res.json({
            code: 0,
            error: "Invalid access, please try again."
        });
    }
}

/**
 * @description This function is to check is user is authorise or token was expired.
 * @param req
 * @param res
 */
exports.check = async (req, res) => {
    try {
        if (req.cookies['access_token'] || req.headers['access_token']) {

            const token = req.cookies['access_token'] || req.headers['access_token'];
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    res.json({
                        code: 0,
                        message: err.name + ": Please login again!"
                    });
                } else if (decoded) {
                    console.log(decoded);
                    let _user = null;

                    _user = await userModel
                        .aggregate([{
                            $match: {
                                _id: ObjectId(decoded._id)
                            }
                        }]);

                    if (_user && _user[0]) {
                        _user = _user[0]

                        if (!res.headersSent) return res.json({
                            _user,
                            token
                        });
                    } else {
                        return res.json({
                            error: "User Not Found"
                        })
                    }
                }
            });

        } else {
            res.json({
                code: 0,
                error: "Please login again."
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: error.array()
        });
    }
}

/**
 * @description This function is to logout user.
 * @param req
 * @param res
 */
exports.signout = async (req, res) => {
    try {
        res.clearCookie('access_token')

        res.json({
            code: 5,
            error: "Logout successfully."
        });

    } catch (error) {
        console.log(error);
        return res.json({
            error: error.array()
        });
    }
}
