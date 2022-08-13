const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');
const isLoggedIn = require('../config/auth')

//Index
router.get('/players', playersController.index);
// New Player form
router.get('/players/new', isLoggedIn, playersController.new);
// Create player
router.post('/players', isLoggedIn, playersController.create);


module.exports = router;