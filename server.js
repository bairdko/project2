var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var connection = require('./config/connection.js')
var PORT = process.env.PORT || 8080;


//Authentication Packages
var session = require('express-session');
var passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var bcrypt = require('bcrypt');


var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

//parse cookie
app.use(cookieParser());

var options = {
  host: "localhost",
  port: process.env.JAWSDB_URL || 3306,
  user: "root",
  password: "",
  database: "persona_db"
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  resave: false,
  store: sessionStore,
  saveUninitialized: false
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
})

//validation package
app.use(expressValidator());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/login.js");
var formRoute = require("./controllers/formController.js");
var qrDisplayRoute = require("./controllers/qrDisplayController.js");

app.use(routes);
app.use(formRoute);
app.use(qrDisplayRoute);


//passport strategies

 passport.use(new LocalStrategy({
  passReqToCallback: true
},
function (req, username, password, done) {
  connection.query("SELECT * from users where username = ?", [username], function (err, results) {
      let user = results[0];
      if (err) {
          throw new Error(err)
          return done(err);
      }
      if (!user) {
          return done(null, null);
      }
      console.log(user);
      let passwordParse = user.password.toString();
      bcrypt.compare(password, passwordParse, function (err, res) {
          if (res) {
              console.log("Match");
              // Passwords match
              return done(null, user);
          } else {
            console.log("No Match")
              // Passwords don't match
              return done(null, false);
          }
      });
  });
}));


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
