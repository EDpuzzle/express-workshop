"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// CHANGELOG
// - We change some attribute names
// - We add new attributes

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

module.exports = mongoose.model("todo", TodoSchema);

// BEFORE

/*
{ 
  name   : "Learn JavaScript ES6",
  status : "completed"  
}
*/

// NOW

/*
{ 
  title       : "Learn JavaScript ES6",
  description : "Refresh knowledge about new ES6 syntax, it is very useful"
  status      : "completed",
  isFavorite  : false
}
*/
