const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async ({ name }) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  const data = await db.collection('products').findOne(ObjectId(id));
  return data;
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const inserted = await db.collection('products').insertOne({ name, quantity });
  return { _id: inserted.insertedId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  await connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return { id, name, quantity };
};

const exclude = async (id) => {
  await connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  productExists,
  getAll,
  getById,
  create,
  update,
  exclude,
};
