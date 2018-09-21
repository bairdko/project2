//require npms

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars"); 

//set up port
var PORT = process.env.PORT || 8080;

//set up express
var app = express();

//serve static content from public directory
app.use(express.static("public"));

//set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set up handlebars
app.engine("handlebars",exphbs({
 defaultLayout: "main",
//  helpers: {
//    skipFirst: function(detail_types){
//       if (detail_types.id === 1){
//         continue;
//       }
//     }
//   }
}));
app.set("view engine", "handlebars");

var formRoute = require("./controllers/formController.js");

app.use(formRoute);

app.listen(PORT,function(){
  console.log("App listening at localhost:" + PORT);
})


