const mongoose = require("mongoose");

const AreaSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
   charge: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
});

const Area = mongoose.model("Area", AreaSchema);

module.exports = Area;




