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
        console.log(req.body, "REQ");
        console.log(players, "PLAYERS");
        console.log(err, "ERROR")
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
    League.findById(req.params.id, function(err, teamDoc){
        teamDoc.players.push(req.body.playerId);
        console.log(teamDoc, "TEAM DOC")
        console.log(req.body, "REQ")
        teamDoc.save(function(err){
            Player.find({}, function(err, players){
                res.render(`teams/${teamDoc._id}`, {
                    players: players,
                })
            })
        })
    })
}

