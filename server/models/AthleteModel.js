const mongoose = require("mongoose");
const athleteSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team" },
  position: String,
  height: Number,
  weight: Number,
  experience: String,
});

const Athlete = mongoose.model("Athlete", athleteSchema);
