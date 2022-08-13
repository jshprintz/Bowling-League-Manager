const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams');
const isLoggedIn = require('../config/auth')


//Show Team
router.get('/teams/:id', teamsController.show);
// create new team
router.post('/leagues/:id/teams', isLoggedIn, teamsController.create);
// delete team
router.delete('/teams/:id', isLoggedIn, teamsController.delete);
// Edit team
router.get('/teams/:id/edit', isLoggedIn, teamsController.edit);

module.exports = router;