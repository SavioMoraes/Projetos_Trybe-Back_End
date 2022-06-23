const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = '123456';

const jwtConfig = {
  algorithm: 'HS256',
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    const token = jwt.sign({ data: newUser }, secret, jwtConfig);

    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
    return res.status(409).json({ message: 'User already registered' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json([...users]);
  } catch (e) {
    console.log(e);
    return res.status(409).json({ message: 'User already registered' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};