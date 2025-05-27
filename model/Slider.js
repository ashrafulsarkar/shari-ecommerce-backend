const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
  title_1: {
    type: String,
  },
  sub_title_1: {
    type: String,
  },
  title_2: {
    type: String,
  },
  sub_title_2: {
    type: String,
  },
  img:{
      type: String,
      required: false,
  },
  icon:{
      type: String,
      required: false,
  },
  type: {
    type: String,
    enum: ["slider", "jo",'lee'],
    default: "slider"
  },
}, {
  timestamps: true
});

const Slider = mongoose.model("Slider", sliderSchema);

module.exports = Slider;




