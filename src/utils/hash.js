const bcrypt = require('bcrypt');
const { bcryptSaltRounds } = require('../config/config');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, bcryptSaltRounds);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };