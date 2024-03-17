const mongoose = require("mongoose");
const trainingSessionSchema = new Schema({
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
  date: Date,
  duration: Number,
  focusArea: String,
});

const TrainingSession = mongoose.model(
  "TrainingSession",
  trainingSessionSchema
);
module.exports = TrainingSession;
