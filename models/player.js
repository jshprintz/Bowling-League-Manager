const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    avg: Number,
    leagues: Array,
    profile: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
}, {
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema);
