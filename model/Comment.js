const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      message: String,
      createdAt: { type: Date, default: Date.now },
      blogId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Blog" },
      created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    { timestamps: true }
  );

  CommentSchema.plugin(mongoosePaginate);
  const Comment = mongoose.model("Comment", CommentSchema);
  module.exports = Comment;
