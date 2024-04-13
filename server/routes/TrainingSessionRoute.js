const express = require('express');
const router = express.Router();
const trainingSessionController = require('../controllers/TrainingSessionController');

// Route to create a training session
router.post('/create', trainingSessionController.createSession);

module.exports = router;
