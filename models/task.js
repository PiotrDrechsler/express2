const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tasks = new Schema({
  name: String,
});

const Task = mongoose.model("task", tasks);

module.exports = { tasks, Task };
