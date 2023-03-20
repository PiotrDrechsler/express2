const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/users");
const { userValidationSchema } = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length !== 24) {
      return res.status(400).send("Wrong id provided");
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

router.post("/", async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { name, age } = req.body;
    const user = await createUser(name, age);
    return res.status(200).json(user);
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("Id is required to perform delete");
  }
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const updatedUser = await updateUser(id, req.body);
    return res.status(200).send(updatedUser);
  } catch {
    return res.status(500).send("Something went wrong PUT!");
  }
});

module.exports = router;
