const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
}, { timestamps: true });

const BlogCategory = mongoose.model('BlogCategory', categorySchema);

module.exports = BlogCategory;