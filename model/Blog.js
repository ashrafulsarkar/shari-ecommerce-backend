const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

// Blog Post Schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    long_description: {
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
    comments: {
      type: String,
      default: 0,
    },
    meta_description: {
      type: String,
      default: null,
    },
    meta_img: {
      type: String,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
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
postSchema.plugin(mongoosePaginate);
const Blog = mongoose.model('Blog', postSchema);
module.exports = Blog;
