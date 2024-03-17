const mongoose = require("mongoose");
const teamSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
  teamName: String,
  ageGroup: String,
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
