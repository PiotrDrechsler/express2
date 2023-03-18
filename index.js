const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const router = require("./routes/routes.js");
const { connectDatabase } = require("./startup/database.js");

connectDatabase();

const app = express();

app.use(express.json());
app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log("Server is litening on port " + port);
});
