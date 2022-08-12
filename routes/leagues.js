const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagues');
const isLoggedIn = require('../config/auth');
const league = require('../models/league');

// Leagues
//Index
router.get('/', leagueController.index);
//New League
router.get('/new', isLoggedIn, leagueController.new);
//Create Leage
router.post('/', isLoggedIn, leagueController.create);
//Show League
router.get('/:id', leagueController.show);
//Delete League
router.delete('/:id', isLoggedIn, leagueController.delete);


// Exporting
module.exports = router;