const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const blogsSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a name for this product."],
    trim: true,
    minLength: [3, "Name must be at least 3 characters."],
    maxLength: [200, "Name is too large"],
  },
  slug: {
    type: String,
    trim: true,
    required: false,
  },
  description: {
    type: String,
    required: true
  },
  img:{
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide valid url(s)"]
  },
  parent:{
    type:String,
    required:true,
    trim:true,
  },
  children:{
    type:String,
    required:true,
    trim:true,
  },
  category: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Category",
      required: true,
    }
  },
  tags: [String],
}, {
  timestamps: true,
})


const Blogs = mongoose.model('Blogs', blogsSchema)

module.exports = Blogs;