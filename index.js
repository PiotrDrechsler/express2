const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const fs = require("fs").promises;

dotenv.config();

const app = express();

const { createBook } = require("./controllers/books");
const { connectDatabase } = require("./startup/database");
const router = require("./routes/routes.js");

connectDatabase();

app.use(express.json());
app.use(router);

const createFolderIfNoExist = require("./helpers");

const storeImage = path.join(process.cwd(), "images");
console.log(storeImage);

const storage = multer.diskStorage({
  destination: (req, fila, cb) => {
    cb(null, storeImage);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upolad = multer({ storage });

app.post("/upload", upolad.single("picture"), async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;
  const fileName = path.join(storeImage, originalname);
  try {
    await fs.rename(temporaryName, fileName);
    const book = await createBook(req.body.name, fileName);
    console.log(book);
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
  return res.status(200).send("plik załadowany pomyślnie!");
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ errorMessage: err.message, status: err.status });
});

const port = 3000;

app.listen(port, () => {
  createFolderIfNoExist(storeImage);
  console.log("Server is litening on port " + port);
});
