const mongoose = require("mongoose");

// Team Schema
const teamSchema = new mongoose.Schema({
  teamName: String,
  contactName: String,
  contactEmail: String,
  captainName: String,
  captainEmail: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  userName: String,
  userAvatar: String,
});

// League Schema
const leagueSchema = new mongoose.Schema({
  leagueName: String,
  startDate: Date,
  dayOfWeek: String,
  timeOfWeek: String,
  duration: Number,
  teams: [teamSchema],
});

module.exports = mongoose.model("League", leagueSchema);
