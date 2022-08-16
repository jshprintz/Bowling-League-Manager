const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
	email: String,
    googleId: {
	    type: String,
	    required: true
	},
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);

