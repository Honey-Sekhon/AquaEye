const express = require("express");
const Router = express.Router();
const authController = require("../controllers/AuthController");

Router.get("/", authController.getAllUsers);
Router.post("/signup", authController.signup);
Router.post("/login", authController.login);

module.exports = Router