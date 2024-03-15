const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({
          message: "User registered successfully",
        });
      })
      .catch((err) => {
        res.json({
          message: "An error occured",
        });
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body; // Changed 'username' to 'email'

  console.log(email, password);
  if (!email || !password) {
    // Updated to check for 'email' instead of 'username'
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

module.exports = { signup, login };
