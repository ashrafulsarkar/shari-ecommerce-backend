
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const BusinessSetting = require("../model/BusinessSetting");

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const users = await BusinessSetting.find();

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
