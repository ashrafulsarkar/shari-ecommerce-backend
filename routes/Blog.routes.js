const express = require('express');
const router = express.Router();
// internal
const blogController = require('../controller/blog.controller');

router.post('/posts', blogController.createBlog);
router.get('/posts', blogController.getAllBlogs);
router.get('/posts/:id', blogController.getBlogById);
router.put('/posts/:id', blogController.updateBlog);
router.delete('/posts/:id', blogController.deleteBlog);;

module.exports = router;