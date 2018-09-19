
//require the npm package
var mysql = require("mysql");

//set up my connection 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "persona_db"
});

//make connection
connection.connect(function(err){
  if(err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//export connection to ORM
module.exports = connection;
