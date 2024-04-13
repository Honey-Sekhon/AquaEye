const { response } = require("express");
const Coach = require("../models/CoachModel");
const TrainingSession = require("../models/TrainingSessionModel");
const Club = require("../models/ClubModel");

const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Failed to get coaches" });
  }
};

/**
 * Retrieves and displays information about a specific coach.
 *
 * @param {object} req - the request object
 * @param {object} res - the response object
 * @return {object} JSON object containing the response or an error message
 */
const showCoach = (req, res) => {
  let coachId = req.body.coachId;
  Coach.findById(coachId)
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res.json({ "Error occured.": err });
    });
};

/**
 * Create a new coach in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with the created coach.
 */ // Assuming you have a Profile model and it's already defined somewhere
const createCoach = async (req, res) => {
  const { profileId, clubs, qualifications, bio } = req.body;

  // Validation to ensure required fields are provided
  if (!profileId || !clubs.length) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    // Optionally, validate the provided profile and club IDs
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    // Ensure all provided club IDs are valid
    const validClubs = await Club.find({ _id: { $in: clubs } });
    if (validClubs.length !== clubs.length) {
      return res.status(404).json({ message: "One or more clubs not found." });
    }

    const newCoach = new Coach({
      profile: profileId,
      clubs,
      qualifications,
      bio,
    });

    const savedCoach = await newCoach.save();
    res
      .status(201)
      .json({ message: "Coach saved successfully", coach: savedCoach });
  } catch (error) {
    console.error("Failed to create coach:", error);
    res
      .status(500)
      .json({ message: "Failed to create coach", error: error.toString() });
  }
};

const updateCoach = async (req, res) => {
  const coachId = req.params.coachId;
  const { qualifications, bio, clubs } = req.body;

  // Validate the provided clubs if updating them
  if (clubs && clubs.length) {
    const validClubs = await Club.find({ _id: { $in: clubs } });
    if (validClubs.length !== clubs.length) {
      return res.status(404).json({ message: "One or more clubs not found." });
    }
  }

  try {
    const updatedCoach = await Coach.findByIdAndUpdate(
      coachId,
      {
        qualifications,
        bio,
        ...(clubs ? { clubs } : {}),
      },
      { new: true }
    )
      .populate("profile")
      .populate("clubs");

    if (!updatedCoach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.json({ message: "Coach updated successfully", coach: updatedCoach });
  } catch (error) {
    console.error("Failed to update coach:", error);
    res
      .status(500)
      .json({ message: "Failed to update coach", error: error.toString() });
  }
};

const deleteCoach = (req, res) => {
  let coachId = req.body.coachId;
  Coach.findByIdAndDelete(coachId)
    .then(() => {
      res.json({ message: "Coach deleted successfully" });
    })
    .catch((err) => {
      res.json({ message: "Failed to delete coach", error: err });
    });
};

const getTeamsByCoach = async (req, res) => {
  try {
    const coachId = req.params.coachId; // Assume you get this from the route parameter
    console.log("Fetching teams for coach ID:", coachId);
    const teams = await TrainingSession.find({ coach: coachId })
      .distinct("team")
      .populate("team");
    console.log("Teams found:", teams);
    res.json(teams);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.toString() });
  }
};

const getAthletesByCoach = async (req, res) => {
  try {
    const coachId = req.params.coachId;
    const coach = await Coach.findById(coachId).populate("clubs"); // Assuming coachId is passed in the request

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    // Extract club IDs from the coach document
    const clubIds = coach.clubs.map((club) => club._id);

    // Find athletes who belong to any of these clubs
    const athletes = await Athlete.find({ club: { $in: clubIds } }).populate(
      "profile"
    );
    res.json(athletes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.toString() });
  }
};

const getTestResultsByCoach = async (req, res) => {
  try {
    const coachId = req.params.coachId; // Assume you get this from the route parameter
    const testResults = await TestResult.find({ coach: coachId }).populate(
      "athlete"
    );
    res.json(testResults);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.toString() });
  }
};

module.exports = {
  getAllCoaches,
  showCoach,
  createCoach,
  updateCoach,
  deleteCoach,
  getTeamsByCoach,
  getAthletesByCoach,
  getTestResultsByCoach,
};
