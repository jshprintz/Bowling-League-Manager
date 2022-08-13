const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    avg: Number,
    contact: Boolean,
    captain: Boolean,
}, {
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema);
