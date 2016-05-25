"use strict";

var _ = require("lodash");
var mailer = require("./../../mailer/mailer");

/* ====================================================== */
/*                        Models                          */
/* ====================================================== */

var Todo = require("./../../models/todo_model");
var TodoAnalytics = require("./../../models/todo_analytics_model");

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

	Todo.findById(id, function (err, todo) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		if (!todo) {
			return res.status(404).json({message: "We couldn't find that Todo"});
		}
		return res.status(200).json(todo.convertToOldTodo());
	});
}


function getTodos (req, res, next) {
	Todo.find({}, function (err, todos) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}

		var parsedTodos = _.map(todos, function (todo) {
			return todo.convertToOldTodo();
		});

		return res.status(200).json(parsedTodos);
	});
}

// POST
// ----

function postTodo (req, res, next) {

	// 1. Create TODO
	// 2. Add analytics event
	// 3. Send email to the user

	var todo = req.body.todo;


	// 1. Create TODO
	var newTodo = new Todo({
		userId      : req.cookies.userId, // Let's assume we have a cookie
		title       : todo,
		description : "",
		status      : "incomplete",
		isFavorite  : false 
	});

	newTodo.validate(function (err) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		newTodo.save(function (err, createdTodo) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}

			// 2. Add analytics event
			var newTodoAnalyticsEvent = new TodoAnalytics({
				userId: todo.userId
			});

			newTodoAnalyticsEvent.save(function (err, analyticsEvent) {
				if (err) {
					return res.status(500).json({message: "Something horrible happened"});
				}

				mailer.sendEmail({
					emailTo : "bar@blurdybloop.com, baz@blurdybloop.com",
					subject : "✔ New Todo Created!",
					text    : "Your TODO has been created"
				}, function (err) {
					if (err) return callback(err);
					return res.status(201).json(createdTodo.convertToOldTodo());
				});

			});
		});
	});
}


// PUT
// ----

function putTodo (req, res, next) {
	var id = req.params.id;

	var updatedInfo = {
		title  : req.body.name,
		status : req.body.status
	};

	Todo.findByIdAndUpdate(id, updatedInfo, {new: true}, function (err, updatedTodo) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		return res.status(200).json(updatedTodo.convertToOldTodo());
	});
}

// DELETE
// ------

function deleteTodo (req, res, next) {
	var id = req.params.id;
	var todo = req.body.todo;

	Todo.findByIdAndRemove(id, function (err, deletedTodo) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		if (!deletedTodo) {
			return res.status(404).json({message: "We couldn't find that Todo"});
		}
		return res.status(200).json(deletedTodo.convertToOldTodo());
	});

}