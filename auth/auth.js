const jwt = require("jsonwebtoken");
const { getUserById } = require("../controllers/users");

const jwtSecret = process.env.JWT_SECRET;

const auth = (...allowedRoles) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("No token provided");
    }
    try {
      const { id } = jwt.verify(token, jwtSecret);
      const user = await getUserById(id);
      const { role } = user;
      const isAllowed = allowedRoles.includes(role);
      if (user) {
        if (isAllowed) {
          next();
        } else {
          return res
            .status(403)
            .send("You don't have premission to this resource");
        }
      } else {
        return res.status(401).send("Access deined");
      }
    } catch {
      return res.status(401).send("Access deined");
    }
  };
};

module.exports = auth;
