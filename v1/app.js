var express=require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


var campgrounds = [
	{name:"xyz",img:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
	{name:"abc",img:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"},
	{name:"pqr",img:"https://newhampshirestateparks.reserveamerica.com/webphotos/NH/pid270015/0/540x360.jpg"}
	]

//Routes
//Landing Page
app.get("/",function(req,res){	
	res.render("landing")
});

//Campground Page
app.get("/campgrounds",function(req,res){	
	
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds",function(req,res){
	//get data from form and add to campground
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name:name, img:image}
	campgrounds.push(newCampground);
	
	//redirect to campground page
	res.redirect("/campgrounds")
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});



//Port
app.listen(3000, function(){
	console.log("YelpCamp Server has Started!");
});
