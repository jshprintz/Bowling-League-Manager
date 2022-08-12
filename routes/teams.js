const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');
const isLoggedIn = require('../config/auth')


// create new team
router.post('/leagues/:id/teams', isLoggedIn, teamsController.create);

module.exports = router;