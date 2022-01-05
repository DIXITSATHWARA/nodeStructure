"use strict"

const mongoose = require("mongoose");

const file = new mongoose.Schema({
    fileName: {
      type: String
    },
    fileUrl: {
      type: String
    },
    contentType: {
      type: String
    },
    size: {
      type: Number
    },
    createdTime: {
      type: String
    }
  }, {
    _id: true
  });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailAddress: {
        type: String
    },
    password: {
        type: String
    },
    phone: {
        type: String
    },
    profilePicture: {},
},{
    collection: "users",
    timestamp:{
        createdAt: 'CreatedDate',
        upadtedAt: 'updatedDate'
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = {
    userModel
}