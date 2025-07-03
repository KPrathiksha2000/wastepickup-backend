const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Dummy password check (no hashing for now)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful",
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ error: "Email already exists" });

  const newUser = new User({ email, password, role: "user" });

  try {
    await newUser.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register" });
  }
});

module.exports = router;
