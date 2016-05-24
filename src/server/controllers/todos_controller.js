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
		return res.status(200).json(todo);
	});
}


function getTodos (req, res, next) {
	Todo.find({}, function (err, todos) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		return res.status(200).json(todos);
	});
}

// POST
// ----

function postTodo (req, res, next) {
	var todo = req.body.todo;

	var newTodo = new Todo({
		name   : todo,
		status : "incomplete"
	});

	newTodo.validate(function (err) {
		if (err) {
			console.log(err);
			return res.status(500).json({message: "Something horrible happened"});
		}
		newTodo.save(function (err, createdTodo) {
			if (err) {
				console.log(err);
				return res.status(500).json({message: "Something horrible happened"});
			}
			return res.status(201).json(createdTodo);
		});
	});
}

// PUT
// ----

function putTodo (req, res, next) {
	var id = req.params.id;

	var updatedInfo = {
		name   : req.body.name,
		status : req.body.status
	};

	Todo.findByIdAndUpdate(id, updatedInfo, {new: true}, function (err, updatedTodo) {
		if (err) {
			return res.status(500).json({message: "Something horrible happened"});
		}
		return res.status(200).json(updatedTodo);
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
		return res.status(200).json(deletedTodo);
	});

}