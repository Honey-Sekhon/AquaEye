const Club = require('../models/ClubModel');
const crypto = require('crypto');

// Create a new club
exports.createClub = async (req, res) => {
  const { clubName, location, contactInfo, identifier } = req.body;

  try {
    const newClub = new Club({
      clubName,
      location,
      contactInfo,
      identifier,
      tokens: {
        boardMember: crypto.randomBytes(16).toString('hex'),
        athlete: crypto.randomBytes(16).toString('hex'),
        coach: crypto.randomBytes(16).toString('hex')
      }
    });

    await newClub.save();
    res.status(201).json({ message: "Club created successfully", club: newClub });
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(500).json({ error: "An error occurred while creating the club" });
  }
};

// Get all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    console.error('Error getting clubs:', error);
    res.status(500).json({ error: "An error occurred while retrieving clubs" });
  }
};

// Get a single club by ID
exports.getClubById = async (req, res) => {
  const { id } = req.params;

  try {
    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    console.error('Error getting club:', error);
    res.status(500).json({ error: "An error occurred while retrieving the club" });
  }
};

// Update a club by ID
exports.updateClubById = async (req, res) => {
  const { id } = req.params;
  const { clubName, location, contactInfo, identifier } = req.body;

  try {
    const club = await Club.findByIdAndUpdate(id, { clubName, location, contactInfo, identifier }, { new: true });
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json({ message: "Club updated successfully", club });
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(500).json({ error: "An error occurred while updating the club" });
  }
};

// Delete a club by ID
exports.deleteClubById = async (req, res) => {
  const { id } = req.params;

  try {
    const club = await Club.findByIdAndDelete(id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error('Error deleting club:', error);
    res.status(500).json({ error: "An error occurred while deleting the club" });
  }
};

// Assign tokens to club roles
exports.assignTokens = async (req, res) => {
  const { clubId } = req.params;
  const { boardMember, athlete, coach } = req.body;

  try {
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (boardMember) {
      club.tokens.boardMember = generateToken();
    }
    if (athlete) {
      club.tokens.athlete = generateToken();
    }
    if (coach) {
      club.tokens.coach = generateToken();
    }

    await club.save();
    res.status(200).json({ message: "Tokens assigned successfully", tokens: club.tokens });
  } catch (error) {
    console.error('Error assigning tokens:', error);
    res.status(500).json({ error: "An error occurred while assigning tokens" });
  }
};
