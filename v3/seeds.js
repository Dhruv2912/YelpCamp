var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
    name: "Campground 1",
    image: "https://picsum.photos/seed/picsum/200/300",
    description: "def",
  },
  {
    name: "Campground 2",
    image: "https://picsum.photos/seed/picsum/200/300",
    description: "abc",
  },
  {
    name: "Campground 3",
    image: "https://picsum.photos/seed/picsum/200/300",
    description: "xyz",
  },
];

function seedDB() {
  //Remove all campgrounds
  Campground.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err);
        }
        console.log("added campgrounds!");
        //create a comment
        Comment.create(
          {
            text: "This place is great",
            author: "Homer",
          },
          function (err, comment) {
            if (err) {
              console.log(err);
            }
            campground.comments.push(comment);
            campground.save();
            console.log("added comments!");
          }
        );
      });
    });
  });
}

module.exports = seedDB;
