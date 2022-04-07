"use strict";

const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @description This function is to get users list.
 * @param req
 * @param res
 */
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


