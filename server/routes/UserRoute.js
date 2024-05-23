const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');

router.get("/all", auth, rbac("admin"), UserController.getAllUsers);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.delete("/delete/:id", auth, rbac("admin"), UserController.deleteUser);
router.post("/add-user", auth, rbac("admin"), UserController.addUser);

module.exports = router;
