const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const data = await db.collection('sales').insertOne({ itensSold });
  return { _id: data.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connection();
  const data = await db.collection('sales').find().toArray();
  return data;
};

const getById = async (id) => {
  const db = await connection();
  const data = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return data;
};

const update = async (id, sale) => {
  const db = await connection();
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return {
    _id: id,
    itensSold: sale,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
