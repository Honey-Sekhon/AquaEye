const Athlete = require("../models/AthleteModel");
const Profile = require("../models/ProfileModel");

// Create a new athlete
exports.createAthlete = async (req, res) => {
  // Implementation
};

// Get all athletes
exports.getAllAthletes = async (req, res) => {
  // Implementation
  try {
    const athletes = await Athlete.find().populate("profile").exec();
    const athleteDetails = athletes.map((athlete) => ({
      id: athlete._id,
      position: athlete.position,
      height: athlete.height,
      weight: athlete.weight,
      experience: athlete.experience,
      profile: athlete.profile,
    }));
    res.json(athleteDetails);
  } catch (error) {
    console.error("Error fetching athletes:", error);
    res.status(500).json({ message: "Failed to fetch athletes" });
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

