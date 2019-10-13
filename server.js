// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Requiring morgan Middleware to help generate server logs
var logger = require("morgan");
var path = require("path");

// Models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

// PORT
var PORT = process.env.PORT || 8080;

// Express
var app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
   defaultLayout: "main",
   partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

// Getting mongoose to connect to newsflash db
mongoose.connect("mongodb://localhost/newsflash", { useNewUrlParser: true });


// Routes
app.get("/", function (req, res) {
   Article.find({ "saved": false }, function (error, data) {
      var hbsObject = {
         article: data
      };
      console.log(hbsObject);
      res.render("home", hbsObject);
   });
});

app.get("/saved", function (req, res) {
   Article.find({ "saved": true }, function (error, data) {
      var hbsObject = {
         article: articles
      };
      res.render("saved", hbsObject);
   });
});

app.get("/scrape", function (req, res) {
   axios.get("https://www.theage.com.au/technology").then(function (response) {
      var $ = cheerio.load(response.data);
      $(".X3yYQ").each(function (i, element) {
         var result = {};

         // Scraping the title, link and summary
         result.title = $(element).find("h3").text();
         result.link = $(element).find("a").attr("href");
         result.summary = $(element).find("p").text();

         Article.create(result).then(function (data) {
            console.log(data);
         })
            .catch(function (error) {
               return res.json(error)
            });
      });
      res.send("Scrape Complete");
   });
});

app.get("/clear", function (req, res) {
   db.Article.remove({ "saved": false }, function (error, removed) {
      if (error) {
         console.log(error);
      }
      else {
         console.log("Article removed.");
      }
   });
   res.redirect("/");
});

app.get("/articles", function (req, res) {
   Article.find({}, function (error, data) {
      if (error) {
         console.log(error);
      }
      else {
         res.json(data);
      }
   });
});