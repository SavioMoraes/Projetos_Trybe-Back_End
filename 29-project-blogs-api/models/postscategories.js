const PostCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
}, {
  timestamps: false,
  tableName: 'PostCategories',
});

postCategory.associate = (models) => {
  postCategory.belongsTo(models.BlogPost, 
    { foreignKey: 'postId', as: 'blogposts', through: postCategory, otherKey: 'categoryId' });
  postCategory.belongsTo(models.Category, 
    { foreignKey: 'categoryId', as: 'category', through: postCategory, otherKey: 'postId' });
};

  return postCategory;
};

module.exports = PostCategory;