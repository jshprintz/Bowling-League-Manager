const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagues');
const isLoggedIn = require('../config/auth');

// Leagues
//Index
router.get('/', leagueController.index);
//New League
router.get('/new', isLoggedIn, leagueController.new);

// Exporting
module.exports = router;