const User = require('../models/User');

const findUserByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

module.exports = { findUserByUsername, createUser };