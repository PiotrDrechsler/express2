const { User } = require("../models/user");

const userStorage = [];

const createUser = async (name, age) => {
  try {
    const user = new User({ name, age });
    user.save();
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const deleteUser = async (_id) => {
  try {
    return User.findByIdAndDelete({ _id });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id, newUser) => {
  const updatedUser = await User.findByIdAndUpdate(id, newUser);
  return updatedUser;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
};
