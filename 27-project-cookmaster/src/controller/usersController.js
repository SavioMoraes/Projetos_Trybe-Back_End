const User = require('../services/usersService');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.createUser({ name, email, password });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createUser,
};
