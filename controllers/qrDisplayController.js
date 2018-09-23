//require npms 
var express = require("express");

//require models
var user = require("../models/users.js");
var profile_type = require("../models/profile_type.js");
var detail_type = require("../models/detail_type.js");
var profile = require("../models/profile.js");
var profile_details = require("../models/profile_details.js");

//set up express router
var router = express.Router();

//get all datat to read in, chain together using the next function

function getProfile(req, res, next) {

  var id1 = req.params.user_id;
  var id2 = req.params.profile_id;

  profile.readWhere(id1,id2,function(data) {
  
    req.profile = data;
    next();
  });
}

function getDetails (req,res,next){
  var id1 = req.params.profile_id;
  profile_details.readJoinWhere(id1,function(data){

    req.profile_details = data;
    next();
  })
}

function renderQRpage(req, res) {

  var hbsObject = {
    profile: req.profile,
    profile_details: req.profile_details
  }

  console.log(hbsObject);
  res.render('qrDisplay', hbsObject);
}

//read data from the sql tables

router.get('/view/:user_id/:profile_id', getProfile, getDetails,renderQRpage);

module.exports = router;