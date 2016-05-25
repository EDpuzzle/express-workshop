"use strict";

var mongoose = require("mongoose");
var boom = require("boom");
var Schema = mongoose.Schema;

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
/*                        Schema                          */
/* ====================================================== */

var TodoSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "incomplete"],
    default: "incomplete"
  },
  isFavorite: {
    type: Boolean,
    required: true,
    default: false
  }
});

TodoSchema.methods.convertToOldTodo = function () {
  return {
    name   : this.title,
    status : this.status
  };
};

var Todo = mongoose.model("todo", TodoSchema);

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

// GET
// ----

function getTodo (id) {
  return new Promise(function (resolve, reject) {
    Todo.findById(id, function (err, todo) {
      if (err) return reject(Boom.wrap(err));

      if (!todo) {
        return reject(Boom.notFound("Missing TODO"));
      }

      return resolve(todo);
    });
  });
}

function getTodos () {
  return new Promise(function (resolve, reject) {
    Todo.find({}, function (err, todos) {
      if (err) return reject(Boom.wrap(err));
      return resolve(todos);
    });
  });
}

// POST
// ----

function postTodo (todo) {
  return new Promise(function (resolve, reject) {

    var newTodo = new Todo({
      userId      : todo.userId,
      title       : todo.title,
      description : todo.description || "(No description)",
      status      : todo.status || "incomplete",
      isFavorite  : todo.isFavorite || false 
    });

    newTodo.validate(function (err) {
      if (err) return reject(Boom.wrap(err));

      newTodo.save(function (err, createdTodo) {
        if (err) return reject(Boom.wrap(err));
        return resolve(createdTodo);
      });
    });

  });
}

// PUT
// -----

function putTodo (id,todo) {
  return new Promise(function (resolve, reject) {
    var updatedInfo = {
      title  : todo.title,
      status : todo.status
    };

    Todo.findByIdAndUpdate(id, updatedInfo, {new: true}, function (err, updatedTodo) {
      if (err) return reject(Boom.wrap(err));
      return resolve(updatedTodo);
    });
  });
} 

// DELETE
// ------

function deleteTodo (id) {
  return new Promise(function (resolve, reject) {
    Todo.findByIdAndRemove(id, function (err, deletedTodo) {
      if (err) return reject(Boom.wrap(err));
      return resolve(deletedTodo);
    });
  });
}
