const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { tasks } = require("./task");

const Schema = mongoose.Schema;

const users = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    password: {
      type: String,
      requried: true,
      min: 6,
    },

    tasks: [tasks],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  return hashedPassword;
};

const User = mongoose.model("user", users);

const userValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  age: Joi.number().integer().required().min(18).max(100),
  password: Joi.string().required().min(6),
});

module.exports = { User, userValidationSchema, hashPassword };
