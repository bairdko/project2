
var connection = require("./connection.js");

//read
//create
//update queries

//helper function to make query string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


//orm is variable is an object of different queryies to the database where you can DRY up code for common db queries.
//here we would make queries where we get info from db. make post to db. delete from db etc. using sql syntax.
var orm = {
  selectWhere: function(tableInput, colToSearch, valOfCol) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  selectAndOrder: function(whatToSelect, table, orderCol) {
    var queryString = "SELECT ?? FROM ?? ORDER BY ?? DESC";
    console.log(queryString);
    connection.query(queryString, [whatToSelect, table, orderCol], function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  findWhoHasMost: function(tableOneCol, tableTwoForeignKey, tableOne, tableTwo) {
    var queryString =
      "SELECT ??, COUNT(??) AS count FROM ?? LEFT JOIN ?? ON ??.??= ??.id GROUP BY ?? ORDER BY count DESC LIMIT 1";

    connection.query(
      queryString,
      [tableOneCol, tableOneCol, tableOne, tableTwo, tableTwo, tableTwoForeignKey, tableOne, tableOneCol],
      function(err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  },

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

  },

  readWhere:function(tableInput,where,cb){
    var queryString = "SELECT * FROM ??"

    queryString += " WHERE " + where[0][0] + "=" + where[0][1];
    for (var j = 1; j < where.length; j++){
      queryString += " AND " + where[j][0] + "=" + where[j][1];
    }

    connection.query(queryString,tableInput,function(err,res){
      if(err) throw(err);

      cb(res);
    })

  },

  readJoinWhere: function(table1, table2,cols,ids,where,cb){
    var queryString = "SELECT t1.*,";

    for (var i = 0; i < cols.length-1; i++){
      var add = "t2." + cols[i] + ",";
      queryString += add;
    }

    queryString += "t2." + cols[cols.length-1];;
    queryString += " FROM ?? t1";
    queryString += " LEFT JOIN ?? t2" ;
    queryString += " ON t1." + ids[0] + "=t2." + ids[1];

    queryString += " WHERE " + where[0][0] + "=" + where[0][1];
    for (var j = 1; j < where.length; j++){
      queryString += " AND " + where[j][0] + "=" + where[j][1];
    }


    connection.query(queryString,[table1,table2],function(err,res){
      if(err) throw err;

      cb(res)
    });
  }


};

//helper function to make query string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}



module.exports = orm;
