const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const clubSchema = new Schema({
  clubName: {String, required: true},
  address: {String, required: true},
  contactName: {String, required: true},
  phoneNumber:{ Number, required : true},
  email: {String, required: true},
  competitionLevel: {String, required: true}, 
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  coaches: [{ type: Schema.Types.ObjectId, ref: 'Coach' }],
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }]
});

// If the user doesn't enter these details we need to give them some random values or can they be left empty.

const Club = mongoose.model("Club", clubSchema);
module.exports = Club;