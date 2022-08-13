const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');


// New Player form
router.get("/players/new", playersController.new)


module.exports = router;