const Player = require('../models/player');
const League = require('../models/league');

module.exports = {
    new: newPlayer,
    create,
}


// render new player page
function newPlayer(req, res) {
    Player.find({}, function (err, players) {
        res.render(`players/new`, {
            players: players,
        })
    })
}

// Create player
function create(req, res) {
    Player.create(req.body, function (err, player){
        console.log(player, "Player")
        console.log(req.body, "REQ")
        res.redirect('/players/new')
    })
}

// // Add player to team
// function addToTeam(req, res) {
//     League.findById(req.params.id, function(err, teamDoc){
//         teamDoc.players.push(req.body.playerId);
//         teamDoc.save(function(err){
//             res.redirect(`/leagues/${teamDoc._id}`)
//         })
//     })
// }

