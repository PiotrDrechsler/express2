const { Book } = require("../models/book");

const createBook = async (name) => {
  try {
    const book = new Book({ name });
    book.save();
    return book;
  } catch (err) {
    throw err;
  }
};

const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};

module.exports = { createBook, getAllBooks };
