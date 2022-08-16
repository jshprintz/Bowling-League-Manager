const Player = require('../models/player');
const League = require('../models/league');

module.exports = {
    create,
    index,
    addToTeam,
    delete: deletePlayer,
    show,
    update,
    deleteFromTeam,
}


//Update Player
function update(req, res) {
    Player.findByIdAndUpdate(req.params.id, req.body, function(err, playerDoc){
        playerDoc.save(function(err){
            res.redirect('/players');
        })
    })
}

// Show player details
function show(req, res) {
    Player.findById(req.params.id, function(err, playerDoc) {
        res.render('players/show.ejs', {
            player: playerDoc,
        })
    })
}

// Remove player from team

function deleteFromTeam(req, res) {
let playerPath = '';
    //Find the player that needs to be removed
    Player.findById(req.params.playerId, function(err, playerDoc){
        // Find the team that he needs to be removed from. First find the league
        for (let i=0; i<playerDoc.leagues.length; i++){
            // Search through the league for the team
            for (let n=0; n<playerDoc.leagues[i].teams.length; n++){
                // Converts the ID path from an object to a string
                playerPath = JSON.stringify(playerDoc.leagues[i].teams[n]._id);
                // If the path matches the request by the client
                if(playerPath === `"${req.params.id}"`){

                    // Remove the player from the league.teams.players array




                        
                        // Remove the team from the players.teams array

                        for (let x=0; x<playerDoc.leagues[i].teams[n].players.length; x++){
                            playerPath = JSON.stringify(playerDoc.leagues[i].teams[n].players[x])
                            if(playerPath === `"${req.params.playerId}"`){
                                //NOTHING IS ACTUALLY REMOVING YET
                                playerDoc.leagues[i].teams[n].players.splice(x, 1);
                            
                            res.redirect(`/teams/${req.params.id}`);
                        }
                        
                    }
                }
            }
        }
    })
}


// Delete the player
function deletePlayer(req, res) {
    Player.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/players');
    })
}

// Create player
function create(req, res) {
    Player.create(req.body, function (err){
        res.redirect('/players');
    });
};


//Display Index
function index(req, res) {
    console.log(req.user)
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
    // Finds the player
    Player.findById(req.body.playerId, function(err, playerDoc){
        // Finds the team
        League.findOne({'teams._id': req.params.id,},
        function(err, leagueDoc) {
            for (let i=0; i<leagueDoc.teams.length; i++) {
                // Converts the ID path from an object to a string
                teamPath = JSON.stringify(leagueDoc.teams[i]._id);
                // If the path matches the request by the client
                if(teamPath === `"${req.params.id}"`) {
                    // Adds player to team
                    leagueDoc.teams[i].players.push(req.body.playerId);
                    leagueDoc.save(function(err){
                        // Adds league to player
                        playerDoc.leagues.push(leagueDoc);
                        playerDoc.save(function(err){
                            res.redirect(`/teams/${leagueDoc.teams[i]._id}`);
                        })
                    })
                }
            }
        })
    })
}
