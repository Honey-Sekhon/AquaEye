// routes/athleteRoutes.js

const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/AthleteController');

// Route to get all athletes
router.get('/players', athleteController.getAllAthletes);

module.exports = router;
