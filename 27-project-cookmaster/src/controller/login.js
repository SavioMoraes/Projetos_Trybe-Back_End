const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const secret = 'cookmaster';

const jwtConfig = {
  algorithm: 'HS256',
};

module.exports = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findUser(email);    
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
