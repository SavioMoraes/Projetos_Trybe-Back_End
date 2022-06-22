const { ObjectId } = require('mongodb');
const Sale = require('../models/SalesModel');
const Product = require('../models/ProductsModel');

const {
  validadeSale,
} = require('../middlewares/validates');

const create = async (sales) => {
  const saleVerification = sales.map((item) => {
    if (typeof item.quantity === 'string' || (Number(item.quantity) <= 0)) return null;
    return true;
  });

  const isInvalid = saleVerification.some((item) => item === null);

  if (isInvalid === true) { 
   throw new Error();
  }

  const selectProducts = sales.map(async (item) => {
    const products = await Product.getById(item.productId); 
    return products;  
  });

  await Promise.all(selectProducts);

  if (await validadeSale(sales)) {
    return { error: 'NEGATIVE_QUANTITY' };
  }

  const data = await Sale.create(sales);
  return data;
};
// Recebi a ajuda do amigo @Léo Funabashi para fazer o create, para fazer as arrow functions e em 'Promise.all'!

const getAll = async () => {
  const data = await Sale.getAll();
  return data;
};

const getById = async (id) => {
  const data = await Sale.getById(id);
  if (!ObjectId(id) || !data) {
    throw new Error();
  }
  return data;
};

const update = async (id, sale) => {
  const saleVerification = sale.map((item) => {
    if (typeof item.quantity === 'string' || (Number(item.quantity) <= 0)) return null;
    return true;
  });

  const isInvalid = saleVerification.some((item) => item === null);

  if (isInvalid === true) { 
   throw new Error();
  }
  const updateResponse = await Sale.update(id, sale);
  return updateResponse;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
