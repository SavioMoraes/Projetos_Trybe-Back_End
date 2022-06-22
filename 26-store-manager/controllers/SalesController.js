const Sale = require('../services/SalesService');

const create = async (req, res) => {
  try {
    const sale = req.body;
    const data = await Sale.create(sale);
    if (data.error && data.error === 'NEGATIVE_QUANTITY') {
      return res.status(404)
      .json({ err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
};

const getAll = async (_req, res) => {
  try {
    const data = await Sale.getAll();
    return res.status(200).json({ sales: data });
  } catch (error) {
    return res.status(404)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Sale.getById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404)
      .json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = req.body;
    const updateResponse = await Sale.update(id, sale);
    return res.status(200).json(updateResponse);
  } catch (error) {
    return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
