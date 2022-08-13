const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    playerName: String,
    playerEmail: String,
    playerAvg: Number,
    contact: Boolean,
    captain: Boolean,
    otherLeagues: Array,
})

module.exports = mongoose.model('Player', playerSchema);
