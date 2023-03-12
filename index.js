const express = require("express");
const router = require("./routes/routes.js");

const app = express();

app.use(express.json());
app.use(router);

const port = 3000;

app.listen(port, () => {
  console.log("Server is litening on port " + port);
});
