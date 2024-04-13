const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const testResultSchema = new Schema({
  athlete: { type: Schema.Types.ObjectId, ref: "Athlete", required: true },
  coach: { type: Schema.Types.ObjectId, ref: "Coach", required: true },
  testType: {
    type: String,
    enum: ["Endurance", "Passing", "Swim Speed"],
    required: true,
  },
  testDate: { type: Date, default: Date.now },
  enduranceTime: Number, // Time in seconds or minutes the athlete can hold the brick
  passingCount: Number, // Number of passes made in a minute
  swimSpeedTime: Number, // Time taken to swim a lap of the pool (consider storing in seconds)
});

const TestResults = mongoose.model("TestResults", testResultSchema);
module.exports = TestResults;
