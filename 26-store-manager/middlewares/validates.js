const Products = require('../models/ProductsModel');

const validationName = async (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422)
      .json({ err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long' } });
  }

  next();
};

const validationQuantity = (req, res, next) => {
  const { quantity } = req.body;

  if (Number(quantity) <= 0) {
    return res.status(422)
    .json({ err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1' } });
  }

  if (typeof quantity === 'string') {
    return res.status(422)
    .json({ err: {
      code: 'invalid_data',
      message: '"quantity" must be a number' } });
  }
  
  next();
};

const validadeSale = async (sales) => {
  const sale = sales.map(async (item) => {
    const { quantity } = await Products.getById(item.productId);
    if (item.quantity > quantity) {
      return true;
    } 
    return false;
  });
  const response = await Promise.all(sale);
  const data = response.some((result) => result === true);
  return data;
};

module.exports = { 
  validationName, 
  validationQuantity,
  validadeSale,
};
