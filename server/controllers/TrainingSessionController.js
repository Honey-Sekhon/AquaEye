const TrainingSession = require("../models/TrainingSessionModel");
// const club = require("../models/ClubModel");

// Create a new training session
exports.createSession = async (req, res) => {
  try {
    const { team, coach, date, duration, focusArea } = req.body;
    const newSession = new TrainingSession({
      team,
      coach,
      date,
      duration,
      focusArea,
    });

    await newSession.save();
    res
      .status(201)
      .json({ message: "Training session created successfully", newSession });
  } catch (error) {
    console.error("Failed to create training session:", error);
    res
      .status(500)
      .json({
        message: "Failed to create training session",
        error: error.toString(),
      });
  }
};

// Get all training sessions
exports.getAllSessions = async (req, res) => {
  // Implementation
};

// Get a single training session by ID
exports.getSessionById = async (req, res) => {
  // Implementation
};

// Update a training session by ID
exports.updateSessionById = async (req, res) => {
  // Implementation
};

// Delete a training session by ID
exports.deleteSessionById = async (req, res) => {
  // Implementation
};
