const Product = require('../services/ProductsService');
const updateDeleteProduct = require('../models/ProductsModel');

const getAll = async (req, res) => {
  try {
    const data = await Product.getAll();
    return res.status(200).json({ products: [...data] });
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.getById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const data = await Product.create({ name, quantity });
    if (data.error && data.error === 'PRODUCTS_EXISTS') {
      return res.status(422)
        .json({ err: {
          code: 'invalid_data',
          message: 'Product already exists' } });   
    }
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Product already' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await updateDeleteProduct.update({ id, name, quantity });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Product already' });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
    }
    const data = await updateDeleteProduct.exclude(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
