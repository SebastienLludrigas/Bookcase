const express = require("express");
const router = express.Router();
const twig = require("twig");

// Affichage de la page d'accueil
router.get("/", (req, res) => {
   res.render("home.html.twig");
});

// Affichage de la page 404
router.use((req, res, next) => {
   const error = new Error("Page non trouvée");
   error.status = 404;
   next(error);
});

router.use((error, req, res) => {
   res.status(error.status || 500);
   res.end(error.message);
});

module.exports = router;