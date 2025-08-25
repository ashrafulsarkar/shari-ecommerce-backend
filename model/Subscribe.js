const mongoose = require("mongoose");

const subscribeSchema = mongoose.Schema({
  email: {
    type: String,
  },
}, {
  timestamps: true
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = Subscribe;




