const jwt = require('jsonwebtoken');
const { Category } = require('../models');

const secret = '123456';

const jwtConfig = {
  algorithm: 'HS256',
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    jwt.sign({ data: newCategory }, secret, jwtConfig);

    return res.status(201).json(newCategory);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [
          ['id', 'ASC'],
      ],
  });

    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};