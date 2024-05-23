const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Club = require("../models/ClubModel");
require("dotenv").config();

// Retrieve and send all users in the database
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};

// Handle user registration
const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during signup" });
  }
};

// Handle user login
const login = async (req, res) => {
  const { login, password, token } = req.body;

  if (!login || !password) {
    return res
      .status(400)
      .json({ error: "Email/Username and password are required" });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });
    if (!user) {
      console.log("1. User not found with login:", login); // Debugging log
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("2. Password mismatch for user:", user); // Debugging log
      console.log("Provided password:", password); // Debugging log
      console.log("Stored password hash:", user.password); // Debugging log
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.isClubAssociated && !token) {
      return res.status(400).json({ error: "Please enter your club token" });
    }

    if (token && !user.isClubAssociated) {
      const club = await Club.findOne({
        $or: [
          { "tokens.boardMember": token },
          { "tokens.athlete": token },
          { "tokens.coach": token },
        ],
      });

      if (!club) {
        return res.status(400).json({ error: "Invalid token" });
      }

      if (token === club.tokens.boardMember) {
        user.role = "boardMember";
      } else if (token === club.tokens.athlete) {
        user.role = "athlete";
      } else if (token === club.tokens.coach) {
        user.role = "coach";
      }
      user.club = club._id;
      user.isClubAssociated = true;

      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log("3. Error during login:", error); // Debugging log
    res.status(500).json({ error: "An error occurred during login" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while removing the user" });
  }
};

const addUser = async (req, res) => {
  const { username, email, password, role, club, team } = req.body;

  if (!username || !email || !password || !role || !club || !team) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      club,
      team,
      isClubAssociated: true,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error while creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

module.exports = { getAllUsers, signup, login, deleteUser, addUser };
