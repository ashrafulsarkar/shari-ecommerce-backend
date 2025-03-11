const mongoose = require("mongoose");

const BusinessSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // Ensures each setting key is unique
    },
    value: {
      type: mongoose.Schema.Types.Mixed, // Can store strings, numbers, objects, arrays, etc.
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessSetting = mongoose.model("BusinessSetting", BusinessSettingSchema);

module.exports = BusinessSetting;
