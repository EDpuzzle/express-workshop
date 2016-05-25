"use strict";

var mongoose = require("mongoose");
var boom = require("boom");
var Schema = mongoose.Schema;

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = {
  todoCreated: todoCreated
};

/* ====================================================== */
/*                        Schema                          */
/* ====================================================== */

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

var TodoAnalytics = mongoose.model("todo_analytics", TodoAnalyticsSchema);

/* ====================================================== */
/*                   Implementation                       */
/* ====================================================== */

function todoCreated (userId) {
  return new Promise(function (resolve, reject) {

    var newTodoAnalyticsEvent = new TodoAnalytics({
      userId: userId
    });

    newTodoAnalyticsEvent.validate(function (err) {
      if (err) return callback(Boom.wrap(err));

      newTodoAnalyticsEvent.save(function (err, analyticsEvent) {
        if (err) return reject(Boom.wrap(err));
        return resolve(analyticsEvent);
      });
    });
  });
}
