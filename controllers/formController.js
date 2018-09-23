
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

function getProfileType(req, res, next) {
  profile_type.all(function(data) {
  
    req.profile_type = data;
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
    detail_types: req.detail_type
  }

  res.render('form', hbsObject);
}

//read data from the sql tables

router.get('/add', getProfileType, getDetailType, renderFormPage);

//post back to sql tables

function postProfileArr(req,res,next){
  var profileArr = [
    req.body.user_id,
    req.body.profile_type_id,
    req.body.profile_name,
    req.body.user_pseudo
  ];

  profile.create(["user_id","profile_type_id","profile_name","user_pseudo"],
  profileArr, function(response){
    console.log("record inserted at " + response.insertId);
    res.json();
    next();
  })
}

function postDetailArr(req,res){

  var detailArr = [
    //text arr
    [ 1,
      1,
      req.body.text,
      null
    ],
    //link1 arr
    [ 1,
      req.body.detail_type_id1,
      req.body.desc1,
      req.body.url1

    ],
    //link2 arr
    [ 1,
      req.body.detail_type_id2,
      req.body.desc2,
      req.body.url2
    ],
    //link3 arr
    [ 1,
      req.body.detail_type_id3,
      req.body.desc3,
      req.body.url3
    ]

  ]

  for(var i = 0; i < detailArr.length; i ++){
    profile_details.create(["profile_id","detail_type_id","description","url"],
    detailArr[i], function(response){
      console.log("record inserted at " + response.insertId);
      res.json();
    });
  }

}

//post data to the table

router.post('/api/profile',postProfileArr,postDetailArr);




module.exports = router;