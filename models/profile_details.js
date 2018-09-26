
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
  },
  readJoinWhere: function(id,cb){
    var where =[["profile_id",id]];
    orm.readJoinWhere("profile_details","detail_type",["detail_type","detail_icon"],["detail_type_id","id"],
    where,function(res){
      cb(res);
    });
  }
};

module.exports = profile_details;