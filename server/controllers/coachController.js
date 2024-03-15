const { response } = require("express");
const Coach = require("../models/coachModel");

const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: "Failed to get coaches" });
  }
};

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
 */
const createCoach = async (req, res) => {
  // Destructure the required properties from the request body
  const { name, email, password, clubName, age, gender } = req.body;

  // Create a new Coach object with the extracted properties
  const newCoach = new Coach({ name, email, password, clubName, age, gender });

  try {
    // Save the new coach to the database and await the result
    const savedCoach = await newCoach.save();

    // Return the created coach with a 201 status code
    // res.status(201).json(savedCoach);
    res
      .status(201)
      .json({ message: "Coach saved successfully", coach: savedCoach });
  } catch (error) {
    // If there's an error, return it with a 500 status code
    res.status(500).json({ error: "Failed to create coach" });
  }
};

const updateCoach = async (req, res) => {
  let coachId = req.body.coachId;
  let UpdateData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    clubName: req.body.clubName,
    age: req.body.age,
    gender: req.body.gender,
  }

Coach.findByIdAndUpdate(coachId, { $set: UpdateData })
    .then(() => {
      res.json({message: "Coach updated successfully"});
    })
    .catch((err) => {
      res.json({message: "Failed to update coach", error: err});
    });

};

const deleteCoach =  (req, res) => {
  let coachId = req.body.coachId;
  Coach.findByIdAndDelete(coachId)
    .then(() => {
      res.json({message: "Coach deleted successfully"});
    })
    .catch((err) => {
      res.json({message: "Failed to delete coach", error: err});
    });
};

module.exports = {
  getAllCoaches,
  showCoach,
  createCoach,
  updateCoach,
  deleteCoach,
};
