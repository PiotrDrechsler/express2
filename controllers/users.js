const { User, hashPassword } = require("../models/user");

const userStorage = [];

const createUser = async (email, age, password) => {
  const hashedPassword = hashPassword(password);
  try {
    const user = new User({ email, age, password: hashedPassword });
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

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
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
  getUserByEmail,
};
