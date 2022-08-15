const Player = require('../models/player');
const League = require('../models/league');

module.exports = {
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
    function(err, leagueDoc) {
        for (let i=0; i<leagueDoc.teams.length; i++) {
            // Converts the ID path from an object to a string
            teamPath = JSON.stringify(leagueDoc.teams[i]._id);
            // If the path matches the request by the client
            if(teamPath === `"${req.params.id}"`) {
                leagueDoc.teams[i].players.push(req.body.playerId);
                leagueDoc.save(function(err){
                    res.redirect(`/teams/${leagueDoc.teams[i]._id}`);
                })
            }
        }
    })
}
