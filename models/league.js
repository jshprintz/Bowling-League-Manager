const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        required: true,
    },
    startDate: Date,
    dayOfWeek: String,
    timeOfWeek: String,
    duration: Number,
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

module.exports = mongoose.model("League", leagueSchema);