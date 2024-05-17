// routes/athleteRoutes.js

const express = require('express');
const router = express.Router();
const athleteController = require('../controllers/AthleteController');

// Route to get all athletes
// router.get('/players', athleteController.getAllAthletes);
router.post('/newAthlete', athleteController.createAthlete);

module.exports = router;
