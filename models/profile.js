const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    userName: String,
    userAvatar: String,
    userEmail: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema);
