const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clubSchema = new Schema({
  clubName: String,
  location: String,
  contactInfo: String,
  identifier: { type: String, required: true, unique: true },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  coaches: [{ type: Schema.Types.ObjectId, ref: "Coach" }],
  athletes: [{ type: Schema.Types.ObjectId, ref: "Athlete" }],
  tokens: {
    boardMember: { type: String, unique: true },
    athlete: { type: String, unique: true },
    coach: { type: String, unique: true },
  },
});

// If the user doesn't enter these details we need to give them some random values or can they be left empty.

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;
