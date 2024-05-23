const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const athleteSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },
  club: { type: Schema.Types.ObjectId, ref: "Club", required: true }, // Direct link to Club
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  position: String,
  height: Number,
  weight: Number,
  wingspan: Number,
  hundredM : Number,
});

const Athlete = mongoose.model("Athlete", athleteSchema);
module.exports = Athlete;