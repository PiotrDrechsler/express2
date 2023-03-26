const express = require("express");
const { createBook, getAllBooks } = require("../controllers/books");
const auth = require("../auth/auth");
const { roles } = require("../config");

const { admin, user } = roles;

const router = express.Router();

router.get("/", auth(admin, user), async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", auth(admin, user), async (req, res) => {
  const { name } = req.body;
  const book = await createBook(name);
  return res.status(200).json(book);
});

module.exports = router;
