const Player = require('../models/player');
const League = require('../models/league');

module.exports = {
    new: newPlayer,
}

function newPlayer(req, res) {
    Player.find({}, function (err, players) {
        res.render(`players/new`, {
            players: players,
        })
    })
}