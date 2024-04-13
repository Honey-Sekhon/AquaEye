const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clubSchema = new Schema({
  clubName: String,
  location: String,
  contactInfo: String,
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;