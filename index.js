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

// GET
// ------

// curl -X GET http://localhost:3000/todos/1
app.get("/todos/:id", function (req, res) {
	var id = req.params.id;

	if (id < todos.length) {
		res.json(todos[id]);
	} else {
		res.status(404).json();
	}
});


// curl -X GET http://localhost:3000/todos
app.get("/todos", function (req, res) {
	res.status(200).json(todos);
});

// POST
// ------

// curl -X POST -d "{\"todo\":\"Learn JavaScript ES6\"}" http://localhost:3000/todos
app.post("/todos", function (req, res) {
	var todo = req.body.todo;

	todos.push(todo);
	res.status(201).json(todo);
});

// PUT
// ------

// curl -X PUT -d "{\"todo\":\"Grab a free beer from the fridge [DONE]\"}" http://localhost:3000/todos/1
app.put("/todos/:id", function (req, res) {
	var id = req.params.id;
	var todo = req.body.todo; // Updated todo

	if (id < todos.length) {
		todos[id] = todo;
		res.status(200).json(todos[id]);
	} else {
		res.status(404).json();
	}
});

// DELETE
// ------

// curl -X DELETE http://localhost:3000/todos/0
app.delete("/todos/:id", function (req, res) {
	var id = req.params.id;

	if (id < todos.length) {
		res.status(200).json(todos.splice(id, 1));
	} else {
		res.status(404).json();
	}
});

// Start Server on port 3000
app.listen(3000);