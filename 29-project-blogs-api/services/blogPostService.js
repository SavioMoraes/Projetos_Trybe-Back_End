const { BlogPost, User } = require('../models');

const createBlogPost = async ({ title, content, categoryIds, email }) => {
  const user = await User.findOne({ where: { email } });
  const blogPost = await BlogPost.create({ title, content, categoryIds, userId: user.id });
  return blogPost;
};

module.exports = {
  createBlogPost,
};
