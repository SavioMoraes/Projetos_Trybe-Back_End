const jwt = require('jsonwebtoken');
const User = require('../../models/usersModel');

const secret = 'cookmaster';

const validateJWT = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  
  try {
    const tokenVerified = jwt.verify(token, secret);

    const user = await User.findUser(tokenVerified.data.email);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = {
  validateJWT,
};
