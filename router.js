const express = require("express");
const router = express.Router();
const twig = require("twig");

// Upload d'images
const multer = require("multer");

const storage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, "./public/images/");
   },
   filename: (req, file, callback) => {
      const date = new Date().toLocaleDateString();
      callback(null, date + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname);
   }
})

const fileFilter = (req, file, callback) => {
   if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
   } else {
      callback(new Error("L'image n'est pas acceptée"), false);
   }
}

const upload = multer({
   storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter
})

module.exports = router;