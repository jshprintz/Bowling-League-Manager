const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagues');
const isLoggedIn = require('../config/auth');

// Leagues
router.get('/', leagueController.index)

// Exporting
module.exports = router;