
//require orm
var orm = require("../config/orm.js");


var profile = {
  all: function(cb){
    orm.all("profile",function(res){
      cb(res);
    });
  },
  create: function(cols,vals,cb){
    orm.create("profile",cols,vals,function(res){
      cb(res);
    });
  }
};

module.exports = profile;