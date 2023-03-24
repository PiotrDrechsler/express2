const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("No token provided");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
    next();
  } catch {
    return res.status(401).send("Access deined");
  }
};

module.exports = auth;
