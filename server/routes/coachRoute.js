const express = require('express');
const Router = express.Router();
const coachController = require('../controllers/coachController');
const upload = require('../middleware/upload');

Router.get('/', coachController.getAllCoaches);
Router.post('/show', coachController.showCoach);
Router.post('/create',upload.array('media[]'), coachController.createCoach);
Router.post('/update', coachController.updateCoach);
Router.post('/delete', coachController.deleteCoach);

module.exports = Router