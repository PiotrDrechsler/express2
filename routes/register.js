const express = require("express");
const { createUser } = require("../controllers/users");
const { userValidationSchema } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { email, age, password, role } = req.body;
    const user = await createUser(email, age, password, role);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Something went wrong POST!");
  }
});

module.exports = router;
