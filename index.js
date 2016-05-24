// Basic Usage of Routers in Express.js

var express = require("express");
var bodyParser = require("body-parser");
var todosRoutes = require("./api/todos_routes");
var app = express();

/* ====================================================== */
/*                        Routes                          */
/* ====================================================== */

app.use("/api/v1/todos", todosRoutes);
app.use("/api/v2/todos", todosRoutes);

// Start Server on port 3000
app.listen(3000);