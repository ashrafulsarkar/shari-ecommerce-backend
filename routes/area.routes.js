const express = require('express');
const router = express.Router();
const Area = require('../model/Area');

// Create
router.post('/', async (req, res) => {
  try {
    const newItem = await Area.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List (Read all)
router.get('/', async (req, res) => {
  try {
    const items = await Area.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List (Read all)
router.get('/:id', async (req, res) => {
  try {
    const items = await Area.findById(req.params.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit (Update)
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Area.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
