"use strict";

var Express = require("express");
var _ = require("lodash");
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
		TodosController.getTodo(id)
			.then(function (todo) {
				return res.status(200).json(todo);
			})
			.catch(function (err) {
				return res.status(500).json({message: "Something horrible happened"});
			});
	});

	router.get("/", function (req, res, next) {
		TodosController.getTodos()
			.then(function (todos) {
				res.status(200).json(todos);
			})
			.catch(function (err) {
				return res.status(500).json({message: "1"});
			});
	});
	
	// POST
	// ------
	
	router.post("/", function (req, res, next) {
		var userId = "56ab2ec74c9bcb324197f384";

		var title = req.body.title;
		var status = req.body.status;
		var description = req.body.description;
		var isFavorite = req.body.isFavorite;

		TodosController.postTodo({
			title       : title,
			userId      : userId,
			description : description,
			status      : status,
			isFavorite  : isFavorite
		})
		.then(function (createdTodo) {
			return res.status(201).json(createdTodo);
		})
		.catch(function (err) {
			console.log(err);
			console.log(err.stack);
			return res.status(500).json({message: "Something horrible happened"});
		});
	});

	// PUT
	// ------
	
	router.put("/:id", function (req, res, next) {

		var id     = req.params.id;
		var title  = req.body.name;
		var status = req.body.status;

		TodosController.putTodo(id, {
			title  : title,
			status : status
		})
		.then(function (createdTodo) {
			return res.status(200).json(updatedTodo);
		})
		.catch(function (err) {
			return res.status(500).json({message: "Something horrible happened"});
		});

	});

	// DELETE
	// ------
	// TodosController.deleteTodo
	router.delete("/:id", function (req, res, next) {

		var id = req.params.id;

		TodosController.deleteTodo(id)
			.then(function (deletedTodo) {
				return res.status(200).json(deletedTodo);
			})
			.catch(function (err) {
				return res.status(500).json({message: "Something horrible happened"});
			});

	});

};

todosRouter(router);

module.exports = router;
