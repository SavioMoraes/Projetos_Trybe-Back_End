const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const createRecipe = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { name, ingredients, preparation, userId, _id: newRecipe.insertedId } };
};

const updateRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });
  return { _id: id, name, ingredients, preparation, userId };
};

const updateRecipeWithImage = async ({ id, name, ingredients, preparation, userId, image }) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });
  return { _id: id, name, ingredients, preparation, userId, image };
};

const excludeRecipe = async (id) => {
  const db = await connection();
  await db.collection('recipes')
    .deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getRecipeById,
  getAllRecipes,
  createRecipe,
  updateRecipe,
  updateRecipeWithImage,
  excludeRecipe,
};
