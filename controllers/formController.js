
//require npms 
var express = require("express");

//require models
var user = require("../models/users.js");

//set up express router
var router = express.Router();

router.get("/add",function(req,res){
  user.all(function(data){
    var hbsObject = {
      users: data
    };

    console.log(hbsObject);
    res.render("form",hbsObject);
  })
});

module.exports = router;