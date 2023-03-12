const { User } = require("../models/user.js");

const userStorage = [];

const createUser = (id, name, age) => {
  const user = new User(id, name, age);
  userStorage.push(user);
  return user;
};

const getAllUsers = () => {
  return userStorage;
};

const getUserById = (id) => {
  return userStorage.find((u) => u.id == id);
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
