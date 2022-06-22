const Product = require('../models/ProductsModel');

const getAll = async () => {
  const data = await Product.getAll();
  return data;
};

const getById = async (id) => {
  const data = await Product.getById(id);

  return data;
};

const create = async ({ name, quantity }) => {
  const productExists = await Product.productExists({ name });
  if (productExists) return { error: 'PRODUCTS_EXISTS' };
  return Product.create({ name, quantity });
};

module.exports = {
  getAll,
  getById,
  create,
};
