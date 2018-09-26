var express = require("express");
var connection = require("../config/connection.js");
var expressValidator = require('express-validator');
var passport = require('passport');

var bcrypt = require("bcrypt");
const saltRounds = 10;

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
  // console.log(req.user);
  // console.log(req.isAuthenticated());
});

router.get('/profile', authenticationMiddleware(), function(req, res, next) {
  res.render('profile', { title: 'Profile' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.get('/login_page', function(req, res, next) {
  res.render('login_page', { title: 'Login' });
});

router.post('/login_page', passport.authenticate(
  'local', {
    successRedirect: '/profile',
    failureRedirect: '/login_page'
  }));

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

router.post('/register', function(req, res){
  // console.log(req.body);


  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
  req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
  const errors = req.validationErrors();

  if (errors){
    // console.log(`errors: ${JSON.stringify(errors)}`);
    res.render('register', {
        title: 'Registration Error',
        errors: errors
        });
  }else{

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;


  bcrypt.hash(password, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], function(error, results, fields){
      if (error) throw error;

      connection.query('SELECT LAST_INSERT_ID() as user_id', function(error, results, fields){
        if (error) throw error;

        const user_id = results[0]
        // console.log(results[0]);

        req.login(user_id,function(err){
          res.redirect('/');
        });
      });

    });

  });

      }
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    // console.log("deserializeUser", user_id);
    done(null, user_id);

});

function authenticationMiddleware() {
	return (req, res, next) => {
		// console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();

	}
}



module.exports = router;
