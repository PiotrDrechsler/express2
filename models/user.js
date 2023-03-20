const Joi = require("joi");
const mongoose = require("mongoose");

const { tasks } = require("./task");

const Schema = mongoose.Schema;

const users = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Uknown User",
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    tasks: [tasks],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model("user", users);

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required().min(18).max(100),
});

module.exports = { User, userValidationSchema };
