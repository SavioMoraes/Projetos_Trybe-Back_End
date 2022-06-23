const Recipe = require('../models/recipeModel');

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    return res.status(200).json([...recipes]);
  } catch (error) {
    return res.status(500)
      .json({ message: 'Server Error' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.getRecipeById(id);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(404)
      .json({ message: 'recipe not found' });
  }
};

const createRecipe = async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const recipe = await Recipe.createRecipe({ name, ingredients, preparation, userId: _id });
  return res
    .status(201)
    .json(recipe); 
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const update = await Recipe.updateRecipe({ id, name, ingredients, preparation, userId: _id });
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

const updateRecipeWithImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    await Recipe
    .updateRecipeWithImage({ id, userId: _id, image });
    const update = await Recipe.getRecipeById(id);
    return res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const excludeRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(422)
      .json({ message: 'Wrong id format' });
    }
    const deleteRecipe = await Recipe.excludeRecipe(id);
    return res.status(204).json(deleteRecipe);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  updateRecipeWithImage,
  excludeRecipe,
};
