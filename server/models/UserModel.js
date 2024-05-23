const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: String,
    role: {
      type: String,
      enum: ["athlete", "coach", "user", "admin", "boardMember","superAdmin"],
      default: "user",
    },
    club: { type: Schema.Types.ObjectId, ref: "Club", default: null },
    team: {
      type: String,
      default: null,
    },
    isClubAssociated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
