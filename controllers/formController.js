
//require npms 
var express = require("express");

//require models
var profile_type = require("../models/profile_type.js");
var detail_type = require("../models/detail_type.js");
var profile = require("../models/profile.js");
var profile_details = require("../models/profile_details.js");

var QRCode = require("QRCode");

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
    16,
    req.body.profile_type_id,
    req.body.profile_name,
    req.body.user_pseudo
  ];

  profile.create(["user_id","profile_type_id","profile_name","user_pseudo"],
  profileArr, function(response){
    console.log("record inserted at " + response.insertId);
    req.insertID = response.insertId;
    console.log(req.insertID)
    next();
  })
}

function postDetailArr(req,res){

  var detailArr = [
    //text arr
    [ req.insertID,
      1,
      req.body.text,
      null
    ],
    //link1 arr
    [ req.insertID,
      req.body.detail_type_id1,
      null,
      req.body.url1

    ],
    //link2 arr
    [ req.insertID,
      req.body.detail_type_id2,
      null,
      req.body.url2
    ],
    //link3 arr
    [ req.insertID,
      req.body.detail_type_id3,
      null,
      req.body.url3
    ],
    //custom1 arr
    [ req.insertID,
      8,
      req.body.description4,
      req.body.url4
    ],
    //custom2 arr
    [ req.insertID,
      8,
      req.body.description5,
      req.body.url5
    ],

  ]

  console.log(detailArr)

  console.log(req.insertID)

  for(var i = 0; i < detailArr.length; i ++){
    
    profile_details.create(["profile_id","detail_type_id","description","url"],
    detailArr[i], function(response){
      console.log("record inserted at " + response.insertId);

    });

  
    //end for loop
  }

  var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    rendererOpts: {
      quality: 0.3
    }
  }

  //replace the 6 with user_id
  var qrURL = "/view/" + 6 + "/" + req.insertID;
   
  QRCode.toDataURL(qrURL, opts, function (err, url) {
    if (err) throw err
  
    console.log(url);
    res.send(url);

  });

}

//post data to the table  

router.post('/api/profile',postProfileArr,postDetailArr);


module.exports = router;