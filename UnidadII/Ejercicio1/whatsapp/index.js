var express  = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(express.static("public")); //Middlewares
app.use(bodyParser.json());

app.listen(3333);