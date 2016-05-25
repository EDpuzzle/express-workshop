"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoAnalyticsSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },
  createdAt: {
    type: Date
  }
});

TodoAnalyticsSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  return next();
});

module.exports = mongoose.model("todo_analytics", TodoAnalyticsSchema);
