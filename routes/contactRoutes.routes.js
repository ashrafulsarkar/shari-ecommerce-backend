// routes/contactRoutes.js
const express = require('express');
const Contact = require('../model/Contact');
const router = express.Router();

// @route   POST /api/contact
// @desc    Add new contact message
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/contact
// @desc    List all contact messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
});

module.exports = router;
