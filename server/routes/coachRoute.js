const express = require('express');
const Router = express.Router();
const coachController = require('../controllers/coachController');

Router.get('/', coachController.getAllCoaches);
Router.post('/show', coachController.showCoach);
Router.post('/create', coachController.createCoach);
Router.post('/update', coachController.updateCoach);
Router.post('/delete', coachController.deleteCoach);

module.exports = Router