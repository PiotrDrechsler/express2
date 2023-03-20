const express = require("express");
const userRouter = require("./users");
const taskRouter = require("./tasks");

const router = express.Router();

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;
