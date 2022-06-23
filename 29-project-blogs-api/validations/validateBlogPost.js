const { Category } = require('../models');

const validateTitle = async (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validadeCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

const verifyCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  const category = await Category.findAll({
    where: {
      id: categoryIds,
    },
  });
  if (!category || category.length === 0) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = {
  validateTitle,
  validateContent,
  validadeCategoryId,
  verifyCategoryId,
};
