const express = require("express");
const Router = express.Router();
const coachController = require("../controllers/CoachController");
const upload = require("../middleware/upload");

Router.get("/", coachController.getAllCoaches);
Router.post("/show", coachController.showCoach);
Router.post("/create", upload.array("media[]"), coachController.createCoach);
Router.post("/update", coachController.updateCoach);
Router.post("/delete", coachController.deleteCoach);
// Route to get teams by a specific coach
Router.get("/:coachId/teams", coachController.getTeamsByCoach);
// Route to get athletes by a specific coach
Router.get("/:coachId/athletes", coachController.getAthletesByCoach);
// Route to get test results by a specific coach
Router.get("/:coachId/testResults", coachController.getTestResultsByCoach);

module.exports = Router;
