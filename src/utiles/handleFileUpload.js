"use strict";

const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");
const urlJoin = require("url-join");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ------------------------------------------------------------------------
    //                   CHANGE DIRECTORY IN PRODUCTION
    //-------------------------------------------------------------------------
    const dest = path.join(__dirname, `../../upload/user-content/${req.user._id + "/"}`);
    mkdirp.sync(dest);
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname +
      Date.now() +
      "." +
      file.originalname.split(".").pop();
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10485760
  }
});

const handleUpload = () => (req, res, next) =>
  upload.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.json({
        code: 0,
        message: err.field + " " + err.message
      });
    } else if (err) {
      console.log(err);
      return res.json({
        code: 0,
        message: err.field + " " + err.message
      });
    } else next();
  });
exports.upload = handleUpload;

const convertForDb = files => {
  let dbFiles = {
    profilePicture: {}
  };
  for (let i in files) {
    let urlArr = [];
    if (files[i].path) {
      urlArr = [
        // process.env.HOSTNAME_FILL,
        "/user-content/",
        files[i].path
        .split("user-content")
        .pop()
        .replace(/\\/g, "/")
      ];
    }
    const fileUrl = urlJoin(...urlArr);
    switch (files[i].fieldname) {
      case "profilePicture":
        dbFiles.profilePicture = {
          fileName: files[i].originalname,
          contentType: files[i].mimetype,
          fileUrl: fileUrl,
          size: files[i].size,
          createdTime: Date(),
          type: "uploaded-file"
        };
        break;
      default:
    }
  }
  return dbFiles;
};
module.exports = {convertForDb};