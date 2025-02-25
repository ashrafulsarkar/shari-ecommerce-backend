const express = require('express');
const router = express.Router();
// internal
const categoryController = require('../controller/blog-category.controller');

// get
router.get('/get/:id', categoryController.getSingleCategory);
// add
router.post('/add', categoryController.addCategory);
// add All Category
router.post('/add-all', categoryController.addAllCategory);
// get all Category
router.get('/all', categoryController.getAllCategory);
// get Show Category
router.get('/show', categoryController.getShowCategory);
// delete category
router.delete('/delete/:id', categoryController.deleteCategory);
// delete product
router.patch('/edit/:id', categoryController.updateCategory);

module.exports = router;