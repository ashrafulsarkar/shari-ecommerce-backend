const BusinessSetting = require("../model/BusinessSetting"); // Ensure correct path

const getAllSettings = async () => {
  try {

    const settings = await BusinessSetting.find();
  const settingsObject = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
  return settingsObject;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw new Error("Failed to fetch settings");
  }
};

const saveSettings = async (settingsArray) => {
    try {
      // Loop through the settings array and save each key-value pair
      for (let setting of settingsArray) {
        // First, check if the setting with the given key exists
        const existingSetting = await BusinessSetting.findOne({ key: setting.key });

        if (existingSetting) {
          // If the setting exists, update it with the new value
          existingSetting.value = setting.value;
          await existingSetting.save();
        } else {
          // If the setting does not exist, create a new one
          const newSetting = new BusinessSetting(setting);
          await newSetting.save();
        }
      }

      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

module.exports = { getAllSettings,saveSettings };
