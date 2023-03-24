const express = require("express");
const userRouter = require("./users");
const taskRouter = require("./tasks");
const loginRouter = require("./login");

const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/login", loginRouter);

module.exports = router;
