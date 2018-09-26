
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
  },
  readWhere: function(id1,id2,cb){
    var where = [
      ["user_id",id1],
      ["id",id2]
    ];
    orm.readWhere("profile",where,function(res){
      cb(res);
    });
  }
};

module.exports = profile;