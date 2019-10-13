// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Requiring morgan Middleware to help generate server logs
var morgan = require("morgan");
var path = require("path");

// Models
var note = require("./models/note.js");
var note = require("./models/article.js");

// Scraping tools
var request = require("axios");
var cheerio = require("cheerio");

// PORT
var PORT = process.env.PORT || 8080;

// Express
var app = express();

app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
   defaultLayout: "main",
   partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

