const express = require("express");
const userRouter = require("./users");
const taskRouter = require("./tasks");
const loginRouter = require("./login");
const registerRouter = require("./register");
const bookRouter = require("./books");

const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/books", bookRouter);

module.exports = router;
