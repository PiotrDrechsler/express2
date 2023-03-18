const { User } = require("../models/user");

const userStorage = [];

const createUser = async (name, age) => {
  const user = new User({ name, age });
  user.save();
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const deleteUser = (id) => {
  for (var i = 0; i < userStorage.length; i++) {
    if (userStorage[i].id == id) {
      userStorage.splice(i, 1);
      return;
    }
  }
};

const updateUser = (id, newUser) => {
  for (var i = 0; i < userStorage.length; i++) {
    if (userStorage[i].id == id) {
      userStorage[i] = newUser;
      return;
    }
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
