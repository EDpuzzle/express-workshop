// Basic Express.js server

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var todos = [
	"Check out EDpuzzle",
	"Grab a free beer from the fridge",
	"Stop using Todos as an example app"
];

// Middleware to parse the info passed in the request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* ====================================================== */
/*                      Middleware                        */
/* ====================================================== */

function requestLogger (req, res, next) {
	console.log(">>>> Request received! <<<<");
	return next();
}

function errorHandler (err, req, res, next) {
	console.log("💣💥 KABOOM!! (" + err.message + ") 💥💣");
	return res.status(500).json();
}

/* ====================================================== */
/*                        Routes                          */
/* ====================================================== */

// GET
// ------

// curl -X GET http://localhost:3000/todos
app.get("/todos", requestLogger, function (req, res) {

	throw new Error("Horrible error");

	res.status(200).json(todos);
});

app.use(errorHandler);

// Start Server on port 3000
app.listen(3000);