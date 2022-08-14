const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    email: String,
    avg: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('Player', playerSchema);
