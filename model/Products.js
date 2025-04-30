const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
// schema design
const validator = require("validator");

const productsSchema = mongoose.Schema({
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
    required: false
  },
  img:{
    type: String,
    required: false,
    validate: [validator.isURL, "Please provide valid url(s)"]
  },
  imageURLs: [{
    img:{
      type: String,
      required: false,
      validate: [validator.isURL, "Please provide valid url(s)"]
    },
  }],
  parent:{
    type:String,
    required:false,
    trim:true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Product price can't be negative"]
  },
  discount: {
    type: Number,
    min: [0, "Product price can't be negative"]
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Product quantity can't be negative"]
  },
  brand: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: false,
    }
  },
  type:{
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Type",
      required: false,
    }
  },
  category: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: ObjectId,
      ref: "Category",
      required: false,
    }
  },
  count: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["in-stock", "out-of-stock", "discontinued"],
      message: "status can't be {VALUE} "
    },
    default: "in-stock",
  },
  reviews: [{type:ObjectId, ref: 'Reviews' }],
  additionalInformation: [{}],
  tags: [String],
  featured: {
    type: Boolean,
    default: false,
  },
  ja: {
    type: Boolean,
    default: false,
  },
  lee: {
    type: Boolean,
    default: false,
  },
  sellCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
})


const Products = mongoose.model('Products', productsSchema)

module.exports = Products;