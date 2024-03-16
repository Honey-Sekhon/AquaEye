const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get users" });
  }
};
// Define the signup function as an asynchronous function to use await for asynchronous operations
const signup = async (req, res, next) => {
  // Check if both email and password are provided in the request body
  if (!req.body.email || !req.body.password) {
    // If either is missing, return a 400 Bad Request response with an error message
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // Attempt to find an existing user in the database with the provided email
    const existingUser = await User.findOne({ email: req.body.email });
    // If an existing user is found, return a 409 Conflict response with an error message
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // If no existing user is found, hash the provided password using bcrypt
    // The second argument (10) is the number of rounds to use for generating the salt
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Create a new User instance with the provided name, email, and the hashed password
    const user = new User({
      name: req.body.name, // Assuming name is also provided in the request body
      email: req.body.email,
      password: hashedPass,
    });

    // Save the new user instance to the database
    const savedUser = await user.save();

    // Respond with a success message indicating the user was registered successfully
    res.json({
      message: "User registered successfully",
    });
  } catch (err) {
    // If an error occurs during any part of the try block (e.g., database operation fails),
    // catch the error and return a 500 Internal Server Error response with an error message
    res.status(500).json({ error: "An error occurred" });
  }
};


const login = (req, res, next) => {
  const { email, password } = req.body; // Changed 'username' to 'email'
  // upgrade to username logic here instead of email
  console.log(email, password);
  if (!email || !password) {
    // Updated to check for 'email'
    return res.status(400).json({ error: "Username or password is missing" });
  }

  User.findOne({ $or: [{ email: email }] }) // No change needed here as it already uses 'email'
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Invalid username" });
      }

      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(401).json({ error: "Invalid password" });
          }

          const token = jwt.sign({ name: user.name }, "secretkey", {
            expiresIn: "1h",
          });

          res.json({
            message: "Login successful",
            token,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: "Error comparing passwords" });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error finding user" });
    });
};

module.exports = { signup, login, getAllUsers };
