const Profile = require("../models/ProfileModel");

// Create a new profile// Update a profile by ID
const updateProfileById = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, photo } = req.body;
  const profileId = req.params.id; // Assuming you pass the profile ID in the route

  try {
    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update fields if provided in the request
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
    if (gender) profile.gender = gender;
    if (photo) profile.photo = photo;

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
  // Implementation
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
};
module.exports = {
  updateProfileById,
  getAllProfiles,
};
