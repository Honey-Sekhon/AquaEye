const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  photo: String, // URL to the photo
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
