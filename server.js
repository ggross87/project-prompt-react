// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Schemas
var Carrier = require("./models/Carrier");

// Create Instance of Express
var app = express();

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration
//connecting to MongoDB
var databaseUri = 'mongodb://';

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(databaseUri);
}


// -------------------------------------------------

// Route to get all saved articles
app.get("/api/saved", function(req, res) {

  Carrier.find({})
    .exec(function(err, doc) {

      if (err) {
        console.log(err);
      }
      else {
        res.send(doc);
      }
    });
});

// Route to add an article to saved list
app.post("/api/saved", function(req, res) {
  var newCarrier = new Carrier(req.body);

  console.log(req.body);

  newCarrier.save(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

// Route to delete an article from saved list
app.delete("/api/saved/", function(req, res) {

  var url = req.param("url");

  Carrier.find({ url: url }).remove().exec(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});

// Any non API GET routes will be directed to our React App and handled by React Router
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// -------------------------------------------------

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on PORT ' + port);
});
