const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const athleteSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  club: { type: Schema.Types.ObjectId, ref: "Club" }, // Direct link to Club
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  position: String,
  height: Number,
  weight: Number,
  age: Number,
  experience: String,
});

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;