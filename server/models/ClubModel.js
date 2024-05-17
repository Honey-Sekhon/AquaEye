const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clubSchema = new Schema({
  clubName: String,
  location: String,
  contactInfo: String,
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  coaches: [{ type: Schema.Types.ObjectId, ref: 'Coach' }],
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }]
});

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;