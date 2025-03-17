const express = require("express");
const BusinessSetting = require("../model/BusinessSetting");
const { getAllSettings, saveSettings, getSetting } = require("../lib/helper");
const router = express.Router();

// ✅ 1. Save or Update a Setting

// multiple settings
router.post("/multiple_settings", async (req, res) => {
    try {
      const settingsArray = req.body;
      await saveSettings(settingsArray);
      res.status(200).json({ message: "Settings saved successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error saving settings", error: error.message });
    }
});


router.post("/", async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ message: "Key and value are required" });
    }

    const setting = await BusinessSetting.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Setting saved successfully", setting });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 2. Get a Single Setting
router.get("/:key", async (req, res) => {
  try {
    const setting = await BusinessSetting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 3. Get All Settings
router.get("/", async (req, res) => {
  try {
    // const settings = await BusinessSetting.find();
    const settings = await getAllSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ 4. Delete a Setting
router.delete("/:key", async (req, res) => {
  try {
    const setting = await BusinessSetting.findOneAndDelete({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: "Setting not found" });
    }
    res.status(200).json({ message: "Setting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// front end
// ✅ 3. Get All Settings
router.get("/front_end/shipping_info", async (req, res) => {
  try {
    const settings = {
      inside_dhaka:await getSetting('inside_dhaka'),
      inside_dhaka_type:"inside_dhaka_type",
      outside_dhaka:await getSetting('outside_dhaka'),
      outside_dhaka_type:"outside_dhaka_type",
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
