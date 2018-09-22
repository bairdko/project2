var express = require("express");
var connection = require("../config/connection.js");
var expressValidator = require('express-validator');

var bcrypt = require("bcrypt");
const saltRounds = 10;

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

router.post('/register', function(req, res){
  console.log(req.body);


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
    console.log(`errors: ${JSON.stringify(errors)}`);
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

      res.render('register', {title: 'Registration Complete'});
    });

  });

      }
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});


module.exports = router;
