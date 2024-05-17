// const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(401).send("Authorization header is required");

//   try {
//     const token = authHeader.split(" ")[1];
//     if (!token) throw new Error("Token not found");

//     const decoded = jwt.verify(token, "secretkey");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     if (error.name == "TokenExpiredError") {
//       res.status(401).json({ error: "Token expired" });
//     } else {
//       res.json({ error: "Invalid Token" });
//     }
//   }
// };

// module.exports = { authenticateToken };

// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust the path based on your directory structure
require('dotenv').config();

const auth = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Find the user by decoded token's userId
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        // Attach user to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = auth;
