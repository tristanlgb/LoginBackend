const userDao = require('../daos/userDao');
const { hashPassword, comparePassword } = require('../utils/hash');

const register = async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userDao.findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await userDao.createUser({ username, password: hashedPassword });
  return res.status(201).json({ message: 'User created', user: newUser });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await userDao.findUserByUsername(username);
  if (!user || !await comparePassword(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.session.user = user;
  return res.status(200).json({ message: 'Logged in successfully' });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, logout };
