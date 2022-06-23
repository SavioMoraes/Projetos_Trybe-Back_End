const { User } = require('../models');

const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  next();
};

const validateEmailLength = async (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  next();
};

const verifyPasswordExists = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  
  next();
};

const verifyPasswordLength = async (req, res, next) => {
  const { password } = req.body;
  
  if (password === '') {
    return res.status(400)
    .json({ message: '"password" is not allowed to be empty' });
  }

  next();
};

const verifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = {
  validateEmailExists,
  validateEmailLength,
  verifyPasswordExists,
  verifyPasswordLength,
  verifyUser,
};
