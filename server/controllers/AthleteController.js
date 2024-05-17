const Athlete = require("../models/AthleteModel");
const Profile = require("../models/ProfileModel");
const getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find();
    res.json(athletes);
    console.log(athletes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAthlete = async (req, res) => {
  try {
    const newAthlete = new Athlete({
      // Assuming you have the necessary athlete fields in the request body
      profile: req.body.profile,
      club: req.body.club,
      team: req.body.team,
      position: req.body.position,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      experience: req.body.experience
    });

    const savedAthlete = await newAthlete.save();
    res.status(201).json(savedAthlete);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get a single athlete by ID (including profile, team details)
exports.getAthleteById = async (req, res) => {
  // Implementation
};

// Update an athlete by ID
exports.updateAthleteById = async (req, res) => {
  // Implementation
};

// Delete an athlete by ID
exports.deleteAthleteById = async (req, res) => {
  // Implementation
};

// module.exports = { getAllAthletes };
