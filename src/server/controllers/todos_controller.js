"use strict";

var nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
// To make this work you will have to configure your email's SMTP
var transporter = nodemailer.createTransport("smtps://user%40gmail.com:pass@smtp.gmail.com");

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

	var newTodo = new Todo({
		userId      : todo.userId,
		title       : todo.title,
		description : todo.description || "",
		status      : todo.status || "incomplete",
		isFavorite  : todo.isFavorite || false 
	});

	newTodo.validate(function (err) {
		if (err) return callback(err);

		var newTodoAnalyticsEvent = new TodoAnalytics({
			userId: todo.userId
		});

		newTodoAnalyticsEvent.validate(function (err) {
			if (err) return callback(err);

			newTodoAnalyticsEvent.save(function (err, analyticsEvent) {
				if (err) return callback(err);

				newTodo.save(function (err, todo) {
					if (err) return callback(err);

					// setup e-mail data with unicode symbols
					var mailOptions = {
					  from    : '"Fred Foo 👥" <foo@blurdybloop.com>',
					  to      : 'bar@blurdybloop.com, baz@blurdybloop.com',
					  subject : '✔ New Todo Created!',
					  text    : 'Your TODO has been created',
					  html    : '<b>Your TODO has been created</b>'
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, function (err, info) {
				    if (err) return callback(err);
				    
				    callback(null, todo);
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