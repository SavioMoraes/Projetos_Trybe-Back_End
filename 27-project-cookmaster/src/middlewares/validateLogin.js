const User = require('../models/usersModel');

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const validateEmailAndPassword = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findUser(email);
  await User.findUser(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  validateUser,
  validateEmailAndPassword,
};
