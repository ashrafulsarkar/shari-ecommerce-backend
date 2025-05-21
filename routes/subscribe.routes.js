const express = require("express");
const Subscribe = require("../model/Subscribe");
const router = express.Router();
// ✅ Add a new subscription (POST /api/subscribe)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Subscribe.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const subscription = new Subscribe({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscription successful", data: subscription });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ List all subscriptions (GET /api/subscribe)
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscribe.find().sort({ createdAt: -1 });
    res.status(200).json({ data: subscriptions });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
