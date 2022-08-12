const mongoose = require("mongoose");

// Team Schema
const teamSchema = new mongoose.Schema({
    teamName: String,
    wins: Number,
    contactName: String,
    contactEmail: String,
    captainName: String,
    captainEmail: String,
});

// League Schema
const leagueSchema = new mongoose.Schema({
    leagueName: String,
    startDate: Date,
    dayOfWeek: String,
    timeOfWeek: String,
    duration: Number,
    teams: [teamSchema],
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});


module.exports = mongoose.model("League", leagueSchema);