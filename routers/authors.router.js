const express = require("express");
const router = express.Router();
const twig = require("twig");
const authorController = require("../controllers/author.controller");

// Route d'affichage des détails d'un auteur
router.get("/:id", authorController.display_author_details);

// Route d'affichage de tous les auteurs
router.get("/", authorController.display_authors);

// Route d'ajout d'un auteur
router.post("/", authorController.add_author);

// Route de suppression d'un auteur
router.post("/delete/:id", authorController.delete_author);

// Route de modification d'un auteur
router.get("/update/:id", authorController.display_author_details_form);

// Route de soumission du formulaire de modification d'un auteur
router.post("/update", authorController.update_author);

module.exports = router;