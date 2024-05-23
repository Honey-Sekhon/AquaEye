const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  firstName:{ type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth:{type : Date, required: true},
  gender: { type: String, required: true },
  team: {type: String, required : true},
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
