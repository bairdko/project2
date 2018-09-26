//import the orm
var orm = require("../config/orm.js");

var detail_type =   {
  all: function(cb){
  orm.all("detail_type",function(res){
    cb(res);
  });
  }
}

module.exports = detail_type;