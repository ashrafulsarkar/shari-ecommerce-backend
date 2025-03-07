const mongoose = require('mongoose');
const { Schema } = mongoose;


// Blog Post Schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      name: {
        type: String,
      },
      id: {
        type: Schema.Types.ObjectId,
        ref: "BlogCategory",
      }
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    img: {
      type: String,
    },
    parent:{
      type:String,
    },
    meta_title: {
      type: String,
      default: null,
    },
    meta_description: {
      type: String,
      default: null,
    },
    meta_img: {
      type: String,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Blog = mongoose.model('Blog', postSchema);
module.exports = Blog;
