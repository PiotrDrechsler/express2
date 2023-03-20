const express = require("express");

const createTaskForUser = require("../controllers/tasks");

const router = express.Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await createTaskForUser(id, name);

  return res.status(200).send(user);
});

module.exports = router;
