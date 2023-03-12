const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/user");
const { userSchema } = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const users = getAllUsers();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { name, age, id } = req.body;
    const user = createUser(id, name, age);
    return res.status(201).json(user);
  } catch {
    return res.status(500).send("Something went wrong POST!");
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  try {
    deleteUser(id);
    return res.status(204).send();
  } catch {
    return res.status(500).send("Something went wrong DELETE!");
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = getUserById(id);
  if (!user) {
    return res.status(404).send("User not found");
  }
  try {
    updateUser(id, req.body);
    return res.status(200).send("User sucessfully updated!");
  } catch {
    return res.status(500).send("Something went wrong PUT!");
  }
});

module.exports = router;
