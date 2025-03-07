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
    required: true
  },
  img:{
    type: String,
    required: true,
    validate: [validator.isURL, "Please provide valid url(s)"]
  },
  imageURLs: [{
    color:{
      name:{
        type: String,
        required: false,
        trim: true,
      },
      clrCode:{
        type: String,
        required: false,
        trim: true,
      }
    },
    img:{
      type: String,
      required: false,
      validate: [validator.isURL, "Please provide valid url(s)"]
    },
    sizes:[String]
  }],
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
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Brand",
      required: true,
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
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "Category",
      required: true,
    }
  },
  sku: {
    type: String,
    required: false,
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