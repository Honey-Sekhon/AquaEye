// Import necessary modules
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens
const User = require("../models/UserModel"); // Import the User model

// Retrieve and send all users in the database
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all user documents
    res.json(users); // Send users as JSON response
  } catch (error) {
    // Handle errors that occur during fetching
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Handle user registration
const signup = async (req, res) => {
  const { email, password, userType } = req.body; // Extract fields from request body

  // Validate required fields
  if (!email || !password || !userType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate userType to be one of the predefined roles
  if (!["athlete", "coach", "admin"].includes(userType)) {
    return res.status(400).json({ error: "Invalid user type" });
  }

  try {
    // Check for an existing user with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // If user exists, prevent duplicate registration
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      email,
      password: hashedPassword,
      userType,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    
    // Respond with success message
    res.status(201).json({
      message: "User created successfully",
      userId: savedUser._id,
      userType: savedUser.userType,
    });
  } catch (error) {
    // Handle errors that occur during signup
    res.status(500).json({ error: "An error occurred during signup" });
  }
};

// Handle user login
const login = async (req, res) => {
  const { email, password } = req.body; // Extract fields from request body

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Look up the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Passwords do not match
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT for the user
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      "secretkey", // Secret key for signing the token
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Respond with success message and token
    res.json({ message: "Login successful", token, userType: user.userType });
  } catch (error) {
    // Handle errors that occur during login
    res.status(500).json({ error: "An error occurred during login" });
  }
};

// @TODO: 1. Update user profile
// @TODO: 2. Delete user
// @TODO: 3. Get user profile

// Export the controller functions to be used in routes
module.exports = { getAllUsers, signup, login };
