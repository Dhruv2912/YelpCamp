var express=require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{
   useNewUrlParser: true,
   useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup
var campgroundSchema = new mongoose.Schema({
	name:String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 	name:"xyz",
// 	image:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg",
// 	description: "uwdjoiwjedoijwoidjiowjediweijdoiwjdojowed"},
// 	function(err,campground){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("New campground created");
// 		console.log(campground);
// 	}
// });

// var campgrounds = [
// 	{name:"xyz",image:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
// 	{name:"abc",image:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
// 	{name:"pqr",image:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"}
// 	]

//Routes
//Landing Page
app.get("/",function(req,res){	
	res.render("landing")
});

//Campground Page
app.get("/campgrounds",function(req,res){	
	//Get all campgrounds from db 
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
		res.render("index",{campgrounds:allCampgrounds})
		}
	});
	// res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//get data from form and add to campground
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name:name, image:image, description:description}
	Campground.create(newCampground, function(err, newlyCreated){
	if(err){
		console.log(err);
	}else{
	//redirect to campground page
	res.redirect("/campgrounds")	
	}
	});
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground: foundCampground});
		}
	});
});

//Port
app.listen(3000, function(){
	console.log("YelpCamp Server has Started!");
});
