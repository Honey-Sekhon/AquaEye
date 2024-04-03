// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/ProfileController');

router.put('/profiles/:id', profileController.updateProfileById);
router.get('/profiles', profileController.getAllProfiles); 

module.exports = router;
