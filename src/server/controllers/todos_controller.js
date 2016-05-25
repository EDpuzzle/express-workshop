"use strict";

/* ====================================================== */
/*                        Models                          */
/* ====================================================== */

var Todo = require("./../models/todo_model");

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

function getTodo (id, callback) {
	Todo.findById(id, callback);
}


function getTodos (callback) {
	Todo.find({}, callback);
}

// POST
// ----

function postTodo (todo, callback) {

	var newTodo = new Todo({
		userId      : todo.userId,
		title       : todo.title,
		description : todo.description || "",
		status      : todo.status || "incomplete",
		isFavorite  : todo.isFavorite || false 
	});

	newTodo.validate(function (err) {
		if (err) return callback(err);

		newTodo.save(callback);
	});
}

// PUT
// ----

function putTodo (id, todo, callback) {
	var updatedInfo = {
		title  : todo.title,
		status : todo.status
	};

	Todo.findByIdAndUpdate(id, updatedInfo, {new: true}, callback);
}

// DELETE
// ------

function deleteTodo (id, callback) {
	Todo.findByIdAndRemove(id, callback);
}