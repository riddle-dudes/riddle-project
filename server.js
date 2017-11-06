var express = require('express');
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var routes1 = require("./controllers/user_controller.js");
var routes2 = require("./controllers/attack_controller.js");
var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes1);
app.use("/timekeeper", routes2);

app.listen(port, function()
{
	console.log("Listening on port "+port)
});
