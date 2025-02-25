const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const CategorySchema = mongoose.Schema({
   parent:{
    type:String,
    required:true,
    trim:true,
    unique:true,
   },
   description:{
    type:String,
    required:false,
   },
   blogs: [{
    type: ObjectId,
    ref: "Blogs"
  }],
},{
  timestamps: true
})

const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;