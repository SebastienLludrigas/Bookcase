const bookSchema = require("../models/books.model");
const authorSchema = require("../models/authors.model");
const mongoose = require("mongoose");
const fs = require("fs");
const { populate } = require("../models/books.model");

// Fonction permettant l'affichage de tous les livres
exports.display_books = (req, res) => {
   authorSchema.find()
   .exec()
   .then(authors => {
      bookSchema.find()
      .populate("author")
      .exec()
      .then(books => {
         res.render("books/list.html.twig", {
            books, 
            authors, 
            message: res.locals.message
         })
      })
      .catch(error => {
         console.log(error);
      });
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant l'ajout d'un livre
exports.add_book = (req, res) => {
   const book = new bookSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      author: req.body.author,
      pages: req.body.pages,
      description: req.body.description,
      image: req.file.path.substring(14)
   });
   book.save()
   .then(result => {
      console.log(result);
      res.redirect("/books");
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant l'affichage détaillé d'un seul livre
exports.display_book_details = (req, res) => {
   bookSchema.findById(req.params.id)
   .populate("author")
   .exec()
   .then(book => {
      console.log(book);
      res.render("books/book.html.twig", {book, isModification: false});
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction permettant l'affichage des détails d'un livre dans un formulaire de modification
exports.display_book_details_form = (req, res) => {
   authorSchema.find()
   .exec()
   .then(authors => {
      bookSchema.findById(req.params.id)
      .populate("author")
      .exec()
      .then(book => {
         res.render("books/book.html.twig", {book, authors, isModification: true});
      })
      .catch(error => {
         console.log(error);
      });
   })
   .catch(error => {
      console.log(error);
   });
}

// Fonction de soumission du formulaire de modification d'un livre
exports.update_book = (req, res) => {
   const updateBook = {
      name: req.body.name,
      author: req.body.author,
      pages: req.body.pages,
      description: req.body.description
   }
   bookSchema.update({_id: req.body.id}, updateBook)
   .exec()
   .then(result => {
      if(result.nModified < 1) throw new Error("La modification a échouée");
      req.session.message = {
         type: 'success',
         content: 'Modification effectuée'
      }
      res.redirect("/books");
   })
   .catch(error => {
      req.session.message = {
         type: 'danger',
         content: error.message
      }
      res.redirect("/books");
   })
}

// Fonction permettant la modification de l'image d'un livre
exports.update_book_image = (req, res) => {
   const book = bookSchema.findById(req.body.id)
   .select("image")
   .exec()
   .then(book => {
      fs.unlink(`./public/images/${book.image}`, error => {
         console.log(error);
      })
      const updateImage = {
         image: req.file.path.substring(14)
      }
      bookSchema.update({_id: req.body.id}, updateImage)
      .exec()
      .then(resultat => {
         res.redirect(`/books/update/${req.body.id}`);
      })
      .catch(error => {
         console.log(error);
      })
   })
}

// Fonction permettant la suppression d'un livre
exports.delete_book = (req, res) => {
   const book = bookSchema.findById(req.params.id)
   .select("image")
   .exec()
   .then(book => {
      fs.unlink(`./public/images/${book.image}`, error => {
         console.log(error);
      })
      bookSchema.remove({_id: req.params.id})
      .exec()
      .then(result => {
         req.session.message = {
            type: 'success',
            content: 'Suppression effectuée'
         }
         res.redirect("/books");
      })
      .catch(error => {
         console.log(error);
      })
   })
   .catch(error => {
      console.log(error);
   })
}