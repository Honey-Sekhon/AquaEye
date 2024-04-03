const express = require("express");
const Router = express.Router();
const UserController = require("../controllers/UserController");
const authToken = require('../middleware/AuthenticationToken');

Router.get("/", UserController.getAllUsers);
Router.post("/signup", UserController.signup);
Router.post("/login", UserController.login);
// New route to get current user info
Router.get("/me", authToken.authenticateToken , UserController.getCurrentUser);
Router.post("/refreshToken", UserController.refreshToken);
module.exports = Router