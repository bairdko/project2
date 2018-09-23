//import mysql connection

var connection = require("../config/connection.js");

//helper function to make query string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


//ORM object
var orm = {
  //read all details of a table
  all: function(tableInput,cb){
    var queryString = "SELECT * FROM ??;"

    connection.query(queryString,tableInput,function(err,res){
      if(err) throw err;

      cb(res);
    });

  },

  create: function(tableInput,cols,vals,cb){
    var queryString = "INSERT INTO " + tableInput;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString,vals,function(err,res){
      if (err) throw err;

      cb(res);
    });

  }
};

//export ORM to the model
module.exports = orm;