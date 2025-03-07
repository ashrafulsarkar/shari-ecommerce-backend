
const bcrypt = require("bcryptjs");
const User = require("../model/User");

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {
    const {  password,email  } = req.body;
    const existuser = await User.findOne({ email: email });
    if(existuser){
     return  res.status(400).json({
      status:400,
      message: 'Email already exit'
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const {  email, password } = req.body;
    let updateData = req.body;

    // Check if the email already exists (excluding the current user)
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.params.id) {
        return res.status(400).json({
          status: 400,
          message: "Email already exists",
        });
      }
      updateData.email = email;
    }

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
