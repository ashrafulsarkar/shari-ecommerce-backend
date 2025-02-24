const express = require('express');
const router = express.Router();
// internal
const blogController = require('../controller/blog.controller');

// add a product
router.post('/add', blogController.addBlog);
// add all product
router.post('/add-all', blogController.addAllBlogs);
// get all products
router.get('/all', blogController.getAllBlogs);
// get Related Products
router.get('/related-blog/:id', blogController.getRelatedProducts);
// get Single Product
router.get("/single-blog/:id", blogController.getSingleBlog);
// get Single Product
router.patch("/edit-blog/:id", blogController.updateBlog);
// get Products ByType 
router.delete('/:id', blogController.deleteBlog);

module.exports = router;