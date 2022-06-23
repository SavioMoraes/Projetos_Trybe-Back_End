const BlogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    createdAt: { type: DataTypes.DATE, field: 'published' },
    updatedAt: { type: DataTypes.DATE, field: 'updated' },
});
  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    blogPost.belongsToMany(models.Category, {
      through: 'PostCategory',
      foreignKey: 'postId',
      as: 'category',
    });
  };
  return blogPost;
};

module.exports = BlogPost;