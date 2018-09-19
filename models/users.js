//import the orm
var orm = require("../config/orm.js")

var user = {
  all: function(cb){
    orm.all("users",function(res){
      cb(res);
    });
  }
};

module.exports = user;