const express = require("express");
const router = express.Router();
const twig = require("twig");
const bookController = require("../controllers/book.controller");
const multer = require("multer");

// Upload d'images
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

// Route de la liste de tous les livres
router.get("/", bookController.display_books);

// Route d'ajout d'un livre
router.post("/", upload.single("image"), bookController.add_book);

// Route d'affichage des détails d'un livre
router.get("/:id", bookController.display_book_details);

// Route d'affichage du formulaire de modification d'un livre
router.get("/update/:id", bookController.display_book_details_form);

// Route de soumission du formulaire de modification d'un livre
router.post("/update", bookController.update_book);

// Route de modification de l'image d'un livre
router.post("/updateImage", upload.single("image"), bookController.update_book_image);

// Route de suppression d'un livre
router.post("/delete/:id", bookController.delete_book);

module.exports = router;