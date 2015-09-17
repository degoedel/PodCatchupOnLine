var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash');
var express      = require('express');

module.exports = function(app, passport) {
  // set up our express application
  app.use(morgan('dev')); // log every request to the console
  app.use(cookieParser()); // read cookies (needed for auth)
  app.use(bodyParser.json()); // get information from html forms
  app.use(bodyParser.urlencoded({ extended: true }));


  // required for passport
  app.use(session({ 
	  secret: 'ilovescotchscotchyscotchscotch',
	  resave: true,
      saveUninitialized: true
	   })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
  
  // routes ======================================================================
  require('./../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
  
  app.use(express.static('./../public'));
	
  app.use(function(req, res){
    res.sendFile('index.html', {root: __dirname + '/../public/'});
  });
}