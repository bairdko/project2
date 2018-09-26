//import the orm
var orm = require("../config/orm.js");

var profile_type =   {
  all: function(cb){
  orm.all("profile_type",function(res){
    cb(res);
  });
  }
}

module.exports = profile_type;