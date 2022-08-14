const Player = require('../models/player');
const League = require('../models/league');

module.exports = {
    new: newPlayer,
    create,
    index,
    addToTeam,
    delete: deletePlayer,
}

function deletePlayer(req, res) {
    Player.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/players');
    })
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
    Player.create(req.body, function (err, players){
        //req.body is the new player
        // player is all of the players
        res.redirect('/players');
    });
};


//Display Index
function index(req, res) {
    Player.find({}, function (err, players) {
        if (err) {
            res.send("You have an error trying to find the leagues. Please call your system administrator.")
        };
        res.render('players/index.ejs', {
            players: players,
        });
    });
};

// Add player to team
function addToTeam(req, res) {
    League.findOne({'teams._id': req.params.id,},
    function(err, teamDoc) {
        console.log(teamDoc, "CONTROLLERS - PLAYERS - TEAMDOC")
        for (let i=0; i<teamDoc.teams.length; i++) {
            // Converts the ID path from an object to a string
            teamPath = JSON.stringify(teamDoc.teams[i]._id);
            // If the path matches the request by the client
            if(teamPath === `"${req.params.id}"`) {
                teamDoc.teams[i].players.push(req.body.playerId);
                teamDoc.save(function(err){
                    res.render(`teams/${teamDoc._id}`);
                })
            }
        }
    })
}
