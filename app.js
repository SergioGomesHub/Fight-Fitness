//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Required to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Public folder with CSS and JS
app.use(express.static("public"));

//Get
app.get("/", function(req,res){
  res.sendFile(__dirname + "public/index.html");
});

//Newsletter
app.post("/newsletter", function(req,res){
  res.sendFile(__dirname + "/success-news.html");
});

//Contact
app.post("/contact", function(req,res){
  res.sendFile(__dirname + "/success-contact.html");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
