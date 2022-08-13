const mongoose = require('mongoose');

// User Model
const userSchema = new mongoose.Schema({
	name: String,
    googleId: {
	    type: String,
	    required: true
	},
	email: String,
    avatar: String,
    
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);

//userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}],
// Think about what nate was talking about where a user is a profile
// first.