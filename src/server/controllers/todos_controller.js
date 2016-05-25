"use strict";

var when = require("when");
var mailer = require("./../mailer/mailer");

/* ====================================================== */
/*                        Models                          */
/* ====================================================== */

var Todo = require("./../models/todo_model");
var TodoAnalytics = require("./../models/todo_analytics_model");

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

function getTodo (id) {
	return Todo.getTodo(id);
}


function getTodos () {
	return Todo.getTodos();
}

// POST
// ----

function postTodo (todo) {
	var newTodo;

	return Todo.postTodo(todo)
		.then(function (createdTodo) {
			newTodo = createdTodo;
			return TodoAnalytics.todoCreated(createdTodo.userId);
		})
		.then(function () {
			return mailer.sendEmail({
				emailTo : "bar@blurdybloop.com, baz@blurdybloop.com",
				subject : "✔ New Todo Created!",
				text    : "Your TODO has been created"
			});
		})
		.then(function () {
			return newTodo;
		});
}

// PUT
// ----

function putTodo (id, todo) {
	return Todo.putTodo(id, todo);
}

// DELETE
// ------

function deleteTodo (id) {
	return Todo.deleteTodo(id);
}