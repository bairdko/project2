
//require orm
var orm = require("../config/orm.js");


var profile_details = {
  all: function(cb){
    orm.all("profile_details",function(res){
      cb(res);
    });
  },
  create: function(cols,vals,cb){
    orm.create("profile_details",cols,vals,function(res){
      cb(res);
    });
  }
};

module.exports = profile_details;