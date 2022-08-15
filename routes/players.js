const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');
const isLoggedIn = require('../config/auth');

//Index
router.get('/players', playersController.index);
// Create player
router.post('/players', isLoggedIn, playersController.create);
// Add player to team
router.post('/teams/:id/players', isLoggedIn, playersController.addToTeam);
// Delete Player
router.delete('/players/:id', isLoggedIn, playersController.delete);



module.exports = router;