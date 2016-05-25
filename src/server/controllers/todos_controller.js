"use strict";

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

function getTodo (id, callback) {
	Todo.findById(id, callback);
}


function getTodos (callback) {
	Todo.find({}, callback);
}

// POST
// ----

function postTodo (todo, callback) {

	// 1. Create TODO
	// 2. Add analytics event
	// 3. Send email to the user

	// 1. Create TODO
	var newTodo = new Todo({
		userId      : todo.userId,
		title       : todo.title,
		description : todo.description || "",
		status      : todo.status || "incomplete",
		isFavorite  : todo.isFavorite || false 
	});

	newTodo.validate(function (err) {
		if (err) return callback(err);

		newTodo.save(function (err, todo) {
			if (err) return callback(err);

			// 2. Add analytics event
			var newTodoAnalyticsEvent = new TodoAnalytics({
				userId: todo.userId
			});

			newTodoAnalyticsEvent.validate(function (err) {
				if (err) return callback(err);

				newTodoAnalyticsEvent.save(function (err, analyticsEvent) {
					if (err) return callback(err);

					// 3. Send email to the user
					mailer.sendEmail({
						emailTo : "bar@blurdybloop.com, baz@blurdybloop.com",
						subject : "✔ New Todo Created!",
						text    : "Your TODO has been created"
					}, function (err) {
						if (err) return callback(err);
						return callback(null, todo);
					});
				});
			});
		});
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