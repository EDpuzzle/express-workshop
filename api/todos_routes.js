var express = require("express");
var todosRoutes = express.Router();

var todos = [
	"Check out EDpuzzle",
	"Grab a free beer from the fridge",
	"Stop using Todos as an example app"
];

// GET
// ------

// curl -X GET http://localhost:3000/api/v1/todos
todosRoutes.get("/", function (req, res) {
	res.status(200).json(todos);
});

module.exports = todosRoutes;
