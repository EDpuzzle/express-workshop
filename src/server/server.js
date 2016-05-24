"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var hbs = require("hbs");
var logger = require("morgan");
var errorHandler = require("./middleware/error_middleware");
var todosRouter = require("./routers/todos_router");	

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ironhack-db");

mongoose.connection.on("open", function () {
	console.log("🗃   MongoDB connected!");
});

var app = express();
app.use(logger("dev"));
app.set("views", path.join(__dirname, "/views"));
app.engine("html", hbs.__express);
app.set("view engine", "html");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* ====================================================== */
/*                        Routes                          */
/* ====================================================== */

app.use("/api/v1/todos", todosRouter);

app.use("/", function (req, res) {
	return res.render("index");
});

app.use(errorHandler);

// Start Server on port 3000
app.listen(3000);
