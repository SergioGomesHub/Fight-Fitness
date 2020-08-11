//jshint esversion:6
//dotenv needs to be at the top
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

//Required to use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//Public folder with CSS and JS
app.use(express.static("public"));

//Get
app.get("/", function(req,res){
  res.sendFile(__dirname + "public/index.html");
});

//Newsletter Submit to Mailchimp
app.post("/newsletter", function(req,res){
  //From index.html
  const name = req.body.fName;
  const email = req.body.email;

  //Data that will be sent to Mailchimp API
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name
        }
      }
    ]
  };

  //Turning data into JSON so Mailchimp can receive it
  const jsonData = JSON.stringify(data);

  //Both const required by https module
  const url = "https://us17.api.mailchimp.com/3.0/lists/" + process.env.LIST;

  const options = {
    method: "POST",
    auth: "sergio1:" + process.env.API_KEY,

  };

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success-news.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  //Write the new data to Mailchimp
  request.write(jsonData);
  request.end();


});


//Contact
app.post("/contact", function(req,res){
  res.sendFile(__dirname + "/success-contact.html");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
