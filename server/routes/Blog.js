const express = require('express');
const blogRoutes = express.Router();


const { showAllBlogs, updateBlog, deleteBlog, createBlog, getUserBlog} = require('../controllers/Blog');
const {auth} = require('../middlewares/auth');


blogRoutes.post('/blog/createBlog', auth, createBlog);
blogRoutes.get('/blog/userBlogs', auth, getUserBlog);
blogRoutes.get('/blog/showAllBlogs', showAllBlogs);
blogRoutes.put('/blog/updateBlog', auth, updateBlog);
blogRoutes.post('/blog/deleteBlog', auth, deleteBlog);

module.exports = blogRoutes;