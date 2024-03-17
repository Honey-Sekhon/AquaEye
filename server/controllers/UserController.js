const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel"); // Ensure the path matches the location of your UserModel file

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

const signup = async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!["athlete", "coach", "admin"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({
        message: "User created successfully",
        userId: savedUser._id,
        userType: savedUser.userType,
      });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during signup" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token, userType: user.userType });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login" });
  }
};

module.exports = { getAllUsers, signup, login };
