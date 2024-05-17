// Import necessary modules
const bcrypt = require("bcryptjs"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens
const User = require("../models/UserModel"); // Import the User model
const Profile = require("../models/ProfileModel");

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
  const { username, email, password } = req.body; // Extract fields from request body

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Validate userType to be one of the predefined roles
  // if (!["athlete", "coach", "admin"].includes(userType)) {
  //   return res.status(400).json({ error: "Invalid user type" });
  // }

  try {
    // Check for an existing user with the same email
    const existingUser = await User.findOne({ email }, { username });
    if (existingUser) {
      // If user exists, prevent duplicate registration
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hash the user's password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // userType,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    const newProfile = new Profile({
      user: savedUser._id,
      firstName: username,
      // Other fields can be left undefined for now
    });

    await newProfile.save();

    // Respond with success message
    res.status(201).json({
      message: "User and profile created successfully",
      userId: savedUser._id,
      // userType: savedUser.userType,
    });
  } catch (error) {
    // Handle errors that occur during signup
    res.status(500).json({ error: "An error occurred during signup" });
  }
};

// Handle user login
const login = async (req, res) => {
  const { login, password } = req.body; // Extract fields from request body

  // Validate required fields
  if (!login || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Look up the user by email
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
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
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    // Respond with success message and token
    res.json({
      message: "Login successful",
      token,
      refreshToken,
      userType: user.userType,
    });
  } catch (error) {
    // Handle errors that occur during login
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    // Assuming req.user is set by the authenticateToken middleware
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).send("User not found");

    // Respond with necessary user details; adjust according to your needs
    res.json({ name: user.username, email: user.email });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const refreshToken = async (req, res) => {
  // Extract the refresh token from the request body
  const receivedRefreshToken = req.body.refreshToken;

  // Verify the received refresh token
  jwt.verify(
    receivedRefreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      } else {
        // Assuming decoded token contains userId and userType, adjust according to your payload
        const userId = decoded.userId;
        const userType = decoded.userType;

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: userId, userType: userType },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );

        // Optionally, generate a new refresh token
        const newRefreshToken = jwt.sign(
          { userId: userId, userType: userType },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        );

        // Respond with the new tokens
        res.status(200).json({
          message: "Token refreshed successfully",
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      }
    }
  );
};

module.exports = { getAllUsers, signup, login, getCurrentUser, refreshToken };
