const express = require("express");
const server = express();
const morgan = require("morgan");
const booksRouter = require("./routers/books.router");
const globalRouter = require("./routers/global.router");
const authorsRouter = require("./routers/authors.router");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");

server.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true,
   cookie: { maxAge: 60000 }
}));

mongoose.connect("mongodb://localhost/bibliotheque", {useNewUrlParser : true, useUnifiedTopology : true});

server.use(express.static("public"));
server.use(morgan("dev"));
server.use(bodyParser.urlencoded({extended: false}));
server.set('trust proxy', 1);

server.use((req, res, next) => {
   res.locals.message = req.session.message;
   delete req.session.message;
   next();
})

server.use("/authors/", authorsRouter);
server.use("/books/", booksRouter); 
server.use("/", globalRouter); 

server.listen(3000);

