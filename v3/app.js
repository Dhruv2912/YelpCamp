var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
//Landing Page
app.get("/", function (req, res) {
  res.render("landing");
});

//INDEX- Show all Campgrounds
app.get("/campgrounds", function (req, res) {
  //Get all campgrounds from db
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE- add new campground to DB
app.post("/campgrounds", function (req, res) {
  //get data from form and add to campground
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect to campground page
      res.redirect("/campgrounds");
    }
  });
});

//NEW- show form to create new campground
app.get("/campgrounds/new", function (req, res) {
  res.render("new.ejs");
});

//SHOW- shows more info about one campground
app.get("/campgrounds/:id", function (req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        res.render("show", { campground: foundCampground });
      }
    });
});

//Port
app.listen(3000, function () {
  console.log("YelpCamp Server has Started!");
});
