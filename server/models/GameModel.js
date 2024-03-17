const mongoose = require("mongoose");
const gameSchema = new Schema({
  date: Date,
  location: String,
  teamA: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  teamB: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  scoreTeamA: Number,
  scoreTeamB: Number,
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
