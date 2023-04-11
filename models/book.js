const Joi = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const books = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    coverImageUrl: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("books", books);

const bookValidationSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { Book, bookValidationSchema };
