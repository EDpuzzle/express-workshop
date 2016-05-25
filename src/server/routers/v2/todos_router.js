"use strict";

var Express = require("express");
var router  = Express.Router();

/* ====================================================== */
/*                     Controllers                        */
/* ====================================================== */

var TodosController = require("./../../controllers/todos_controller");

/* ====================================================== */
/*                        Router                          */
/* ====================================================== */

var todosRouter = function (router) {
	// Parent: /todos

	// GET
	// ------

	router.get("/:id", function (req, res, next) {

		var id = req.params.id;

		TodosController.getTodo(id, function (err, todo) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}
			if (!todo) {
				return res.status(404).json({message: "We couldn't find that Todo"});
			}
			return res.status(200).json(todo);
		});

	});

	router.get("/", function (req, res, next) {

		TodosController.getTodos(function (err, todos) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}
			return res.status(200).json(todos);
		});

	});
	
	// POST
	// ------
	
	router.post("/", function (req, res, next) {

		var todo = req.body.todo;
		var userId = req.cookies.userId; // Let's assume we have a cookie

		TodosController.postTodo({
			userId : userId,
			title  : todo
		}, function (err, createdTodo) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}
			return res.status(201).json(createdTodo);
		});

	});

	// PUT
	// ------
	
	router.put("/:id", function (req, res, next) {

		var id     = req.params.id;
		var title  = req.body.name;
		var status = req.body.status;

		TodosController.putTodo(id, {
			title  : name,
			status : status
		}, function (err, updatedTodo) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}
			return res.status(200).json(updatedTodo);
		});

	});

	// DELETE
	// ------
	
	router.delete("/:id", function (req, res, next) {

		var id = req.params.id;

		TodosController.deleteTodo(id, function (err, deletedTodo) {
			if (err) {
				return res.status(500).json({message: "Something horrible happened"});
			}
			if (!deletedTodo) {
				return res.status(404).json({message: "We couldn't find that Todo"});
			}
			return res.status(200).json(deletedTodo);
		});

	});

};

todosRouter(router);

module.exports = router;
