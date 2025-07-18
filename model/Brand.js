const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a brand name"],
    maxLength: 100,
    unique: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  products: [{
    type: ObjectId,
    ref: "Products"
  }],
}, {
  timestamps: true
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;




