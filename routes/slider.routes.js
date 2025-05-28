const express = require('express');
const router = express.Router();
const Slider = require('../model/Slider');

// Create
router.post('/', async (req, res) => {
  try {
    const newItem = await Slider.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List (Read all)
router.get('/', async (req, res) => {
  try {
    const items = await Slider.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/slider_data', async (req, res) => {
  try {
    const items = await Slider.find({ type: req.query.type });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List (Read all)
router.get('/:id', async (req, res) => {
  try {
    const items = await Slider.findById(req.params.id);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit (Update)
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Slider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
