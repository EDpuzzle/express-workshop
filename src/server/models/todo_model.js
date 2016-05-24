var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "incomplete"],
    default: "incomplete"
  }
});

module.exports = mongoose.model("todo", TodoSchema);
