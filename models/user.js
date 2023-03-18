const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const users = new Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("user", users);

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required().min(18).max(100),
});

module.exports = { User, userValidationSchema };
