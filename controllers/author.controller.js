const authorSchema = require("../models/authors.model");
const bookSchema = require("../models/books.model");
const mongoose = require("mongoose");
const fs = require("fs");
const { exec } = require("child_process");

// Fonction permettant d'afficher les détails d'un auteur 
exports.display_author_details = (req, res) => {
   authorSchema.findById(req.params.id)
   .populate("books")
   .exec()
   .then(author => {
      res.render("authors/author.html.twig", {author, isModification: false});
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant d'afficher tous les auteurs
exports.display_authors = (req, res) => {
   authorSchema.find()
   .populate("books")
   .exec()
   .then(authors => {
      res.render("authors/list.html.twig", {authors, message: res.locals.message});
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant l'ajout d'un auteur
exports.add_author = (req, res) => {
   const author = new authorSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      firstname: req.body.firstname,
      age: req.body.age,
      sex: req.body.sex
   });
   author.save()
   .then(result => {
      console.log(result);
      res.redirect("/authors");
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant la suppression d'un auteur
exports.delete_author = (req, res) => {
   authorSchema.find()
   .where("name").equals("anonyme")
   .exec()
   .then(author => {
      bookSchema.updateMany({"author": req.params.id},{"$set": {"author": author[0]._id}},{"multi": true})
      .exec()
      .then(
         authorSchema.remove({_id: req.params.id})
         .where("name").ne("anonyme")
         .exec()
         .then(res.redirect("/authors"))
         .catch(error => {
            console.log(error);
         })
      )
   })
}

// Fonction permettant l'affichage des détails d'un auteur dans un formulaire de modification
exports.display_author_details_form = (req, res) => {
   authorSchema.findById(req.params.id)
   .populate("books")
   .exec()
   .then(author => {
      res.render("authors/author.html.twig", {author, isModification: true});
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction de soumission du formulaire de modification d'un auteur
exports.update_author = (req, res) => {
   const authorUpdate = {
      name: req.body.name,
      firstname: req.body.firstname,
      age: req.body.age,
      sex: req.body.sex
   };
   authorSchema.update({_id: req.body.id}, authorUpdate)
   .exec()
   .then(result => {
      res.redirect("/authors");
   })
   .catch(error => {
      console.log(error);
   });
}