"use strict";

/* ====================================================== */
/*                        Models                          */
/* ====================================================== */

// Temporary fake Model until we add MongoDB to the app
var todos = [
	"Check out EDpuzzle",
	"Grab a free beer from the fridge",
	"Stop using Todos as an example app"
];

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
	getTodo    : getTodo,
	getTodos   : getTodos,
	postTodo   : postTodo,
	putTodo    : putTodo,
	deleteTodo : deleteTodo
};

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

// GET
// ----

function getTodo (req, res, next) {
	var id = req.params.id;

	if (id >= todos.length) {
		return res.status(404).json();
	}

	return res.status(200).json(todos[id]);
}


function getTodos (req, res, next) {
	res.status(200).json(todos);
}

// POST
// ----

function postTodo (req, res, next) {
	var todo = req.body.todo;

	todos.push(todo);
	res.status(201).json(todo);
}

// PUT
// ----

function putTodo (req, res, next) {
	var id = req.params.id;
	var todo = req.body.todo;

	if (id >= todos.length) {
		return res.status(404).json();
	}

	todos[id] = todo;
	return res.status(200).json(todos[i]);
}

// DELETE
// ------

function deleteTodo (req, res, next) {
	var id = req.params.id;
	var todo = req.body.todo;

	if (id >= todos.length) {
		return res.status(404).json();
	}

	var deletedTodo = todos.splice(id, 1);
	return res.status(200).json(deletedTodo);
}