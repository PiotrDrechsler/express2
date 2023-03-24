const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/users");
const issueToken = require("./issueToken");

const loginHandler = async (email, incomingPassword) => {
  //pobieramy użytkownika
  const user = await getUserByEmail(email);
  //jezeli nie ma uzytkownika to zwroc info
  if (!user) {
    throw "User not found!!!";
  }
  //wez haslo naszego uzytkownika
  const userPassword = user.password;
  //porównaj hasla (przychodzace i uzytkownika)
  const result = bcrypt.compareSync(incomingPassword, userPassword);
  //zwracamy token
  if (result) {
    return issueToken(user);
  } else {
    throw "Invalid credentials";
  }
};

module.exports = loginHandler;
