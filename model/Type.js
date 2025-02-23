const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const typeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a product type name"],
    maxLength: 100,
    unique: true,
  },
  description: String,
  products: [{
    type: ObjectId,
    ref: "Products"
  }],
}, {
  timestamps: true
});

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;