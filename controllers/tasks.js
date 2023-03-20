const { getUserById } = require("./users");
const { Task } = require("../models/task");

const createTaskForUser = async (userId, name) => {
  const user = await getUserById(userId);
  const newTask = new Task({ name });
  user.tasks.push(newTask);
  return await user.save();
};

module.exports = createTaskForUser;
