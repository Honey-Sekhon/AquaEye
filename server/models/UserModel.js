const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: String, // URL to the photo
    role: { type: String, enum: ["athlete", "coach", "user","admin","board"], default: "user" },
    club: { type: Schema.Types.ObjectId, ref: "Club", default: null },
  },
  { timestamps: true }
);

// Hash the password before saving the user
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
