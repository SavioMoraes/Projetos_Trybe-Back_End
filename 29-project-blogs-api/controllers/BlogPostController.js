const jwt = require('jsonwebtoken');
const BlogPost = require('../services/blogPostService');

const secret = '123456';

const jwtConfig = {
  algorithm: 'HS256',
};

const createBlogPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const newPost = await BlogPost.createBlogPost({ title, content, categoryIds, userId: id });
    
    jwt.sign({ data: newPost }, secret, jwtConfig);

    return res.status(201).json(newPost);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [{ all: true }],
    });

    return res.status(200).json(blogPosts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};
