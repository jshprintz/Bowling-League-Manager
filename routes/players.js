const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');


//Index
router.get('/players', playersController.index);
// New Player form
router.get('/players/new', playersController.new);
// Create player
router.post('/players', playersController.create);
// Add Player
//router.post('teams/:id/players', playersController.addToTeam);



module.exports = router;