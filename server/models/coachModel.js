const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coachSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    clubname: String,
    age: Number,
    gender: String,
    media: {
      type: String,
    },
  },
  { timestamps: true }
);

const Coach = mongoose.model("Coach", coachSchema);
module.exports = Coach;
