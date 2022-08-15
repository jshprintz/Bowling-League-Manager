const express = require('express');
const router = express.Router();
const leagueController = require('../controllers/leagues');
const isLoggedIn = require('../config/auth');
const league = require('../models/league');

// Leagues
//Index
router.get('/', leagueController.index);
//Create Leage
router.post('/', isLoggedIn, leagueController.create);
//Show League
router.get('/:id', leagueController.show);
//Delete League
router.delete('/:id', isLoggedIn, leagueController.delete);
// Edit League
router.get('/:id/edit', isLoggedIn, leagueController.edit);
//Update League
router.put('/:id', isLoggedIn, leagueController.update);


// Exporting
module.exports = router;