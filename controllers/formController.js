
//require npms 
var express = require("express");

//require models
var user = require("../models/users.js");
var profile_type = require("../models/profile_type.js");
var detail_type = require("../models/detail_type.js");

//set up express router
var router = express.Router();

//get user data


/* possibly instead of a model per table, a model per page.
so wouldn't use user.all and profile_type.all, but instead form.all */

/*might not need rows? -- no i do need, that's data funciton*/

function getProfileType(req, res, next) {
  profile_type.all(function(data) {
  
    req.profile_type = data;
    next();
  });
}

/*need to switch this out with get detail_type, but this will work for now*/

function getUser(req, res, next) {
  user.all(function(data) {

    req.user = data;
    next();
  });
}

function getDetailType (req,res,next){
  detail_type.all(function(data){

    req.detail_type = data;
    next();
  })
}

function renderFormPage(req, res) {

  var hbsObject = {
    profile_types: req.profile_type,
    users: req.user,
    detail_types: req.detail_type
  }

  console.log(hbsObject);
  res.render('form', hbsObject);
}

router.get('/add', getProfileType, getUser, getDetailType, renderFormPage);

module.exports = router;