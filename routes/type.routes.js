const express = require('express');
const router = express.Router();
// internal
const typeController = require('../controller/type.controller');

// add Type
router.post('/add',typeController.addType);
// add All Type
router.post('/add-all',typeController.addAllType);
// get Active Types
router.get('/active',typeController.getActiveTypes);
// get all Type
router.get('/all',typeController.getAllTypes);
// delete Type
router.delete('/delete/:id',typeController.deleteType);
// get single Type
router.get('/get/:id', typeController.getSingleType);
// Edit Type
router.patch('/edit/:id', typeController.updateType);

module.exports = router;