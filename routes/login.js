const express = require("express");
const loginHandler = require("../auth/loginHandler");

const router = express.Router();

router.post("/", async (req, res) => {
  //walidujemy poprawność danych
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  //sprawdz czy haslo i login sa poprawne
  try {
    //logujemy uzytkownika
    const token = await loginHandler(email, password);
    //jesli logowanie jest poprawne to wydaj token
    return res.status(200).send(token);
  } catch (err) {
    return res.status(401).send(err);
  }
});

module.exports = router;
