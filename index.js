// Basic Express.js server

var express = require("express");
var app = express();

var todos = [
	"Check out EDpuzzle",
	"Grab a free beer from the fridge",
	"Stop using Todos as an example app"
];


app.get("/todos", function (request, response) {
	response.json(todos);
});


// Start Server on port 3000
app.listen(3000);