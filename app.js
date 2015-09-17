// app.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var process = require('process');
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');


var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration
require('./config/express')(app, passport);


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);