const express = require('express');
const router = express.Router();
// internal
const blogController = require('../controller/blog.controller');

router.get("/front_list", blogController.getListBlogs);
router.post('/posts', blogController.createBlog);
router.get('/posts', blogController.getAllBlogs);
router.get('/posts/:id', blogController.getBlogById);
router.put('/posts/:id', blogController.updateBlog);
router.delete('/posts/:id', blogController.deleteBlog);;
router.get('/category_with_count', blogController.category_with_count);;
router.get('/popular_tags', blogController.popular_tags);
router.get('/blog_details/:slug', blogController.blog_details);;

module.exports = router;