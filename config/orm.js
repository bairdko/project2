//import mysql connection

var connection = require("../config/connection.js");

//ORM object
var orm = {
  //read all details of a table
  all: function(tableInput,cb){
    var queryString = "SELECT * FROM ??;"

    connection.query(queryString,tableInput,function(err,res){
      if(err) throw err;

      cb(res);
    });

  }
};

//export ORM to the model
module.exports = orm;