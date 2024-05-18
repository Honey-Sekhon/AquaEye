const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coachSchema = new Schema({
  profile: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  clubs: [{ type: Schema.Types.ObjectId, ref: "Club", required: true }],
  coachinglevel: String,
  bio: String,
});

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
