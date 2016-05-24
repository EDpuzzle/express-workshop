"use strict";

var Express = require("express");
var router  = Express.Router();

/* ====================================================== */
/*                     Controllers                        */
/* ====================================================== */

var TodosController = require("./../controllers/todos_controller");

/* ====================================================== */
/*                        Router                          */
/* ====================================================== */

var todosRouter = function (router) {
	// Parent: /todos
	router.get("/:id", TodosController.getTodo);
	router.get("/", TodosController.getTodos);
	router.post("/", TodosController.postTodo);
	router.put("/:id", TodosController.putTodo);
	router.delete("/:id", TodosController.deleteTodo);
};

todosRouter(router);

module.exports = router;
