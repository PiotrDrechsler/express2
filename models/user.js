const Joi = require("joi");

class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().required().min(18).max(100),
});

module.exports = { User, userSchema };
