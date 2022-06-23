const connection = require('../models/connection');

const validateParams = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email.includes('@') || !email.includes('.com')) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const db = await connection();
  if (await db.collection('users').findOne({ email })) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  
  next();
};

module.exports = {
  validateParams,
  verifyEmail,
  emailExists,
};
