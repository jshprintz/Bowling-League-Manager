const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    profileName: String,
    profileAvatar: String,
    profileEmail: String,
    profileGoogleId: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', profileSchema);
