const League = require("../models/league");
const Player = require("../models/player");

module.exports = {
    create,
    delete: deleteTeam,
    show,
    edit,
    update,
};

// Update Team
function update(req, res) {
    League.findOneAndUpdate({"teams._id": req.params.id}, req.body, 
    function(err, teamDoc){
        // Cycle through all the teams in the league
        for (let i=0; i<teamDoc.teams.length; i++) {
            // Converts the ID path from an object to a string
            teamPath = JSON.stringify(teamDoc.teams[i]._id);
            // If the path matches the request by the client
            if(teamPath === `"${req.params.id}"`) {
                teamDoc.teams[i].teamName = req.body.teamName;
                teamDoc.teams[i].contactName = req.body.contactName;
                teamDoc.teams[i].contactEmail = req.body.contactEmail;
                teamDoc.teams[i].captainName = req.body.captainName;
                teamDoc.teams[i].captainEmail = req.body.captainEmail;
                teamDoc.save(function(err){
                    res.render('teams/show.ejs', {
                        team: teamDoc.teams[i],
                    });
                });
            };
        };
    });
};

// Edit team
function edit(req, res) {
    League.findOne({'teams._id': req.params.id}, 
    function(err, teamDoc) {
    // Cycle through all the teams in the league
        for (let i=0; i<teamDoc.teams.length; i++) {
            // Converts the ID path from an object to a string
            teamPath = JSON.stringify(teamDoc.teams[i]._id);
            // If the path matches the request by the client
            if(teamPath === `"${req.params.id}"`) {
                res.render('teams/edit.ejs', {
                    team: teamDoc.teams[i],
                });
            };
        };
    });
}


// Show team
function show(req, res) {
let teamPath = '';
    Player.find({}, function(err, allPlayers){
        // Find the correct league that has the team selected
        League.findOne({'teams._id': req.params.id,}, 
        async function(err, teamDoc) {
            // Cycle through all the teams in the league
            for (let i=0; i<teamDoc.teams.length; i++) {
                // Converts the ID path from an object to a string
                teamPath = JSON.stringify(teamDoc.teams[i]._id);
                // If the path matches the request by the client
                if(teamPath === `"${req.params.id}"`) {
                    let players = [];
                    
                    for (let n=0; n<teamDoc.teams[i].players.length; n++) {
                        let player = await Player.findOne({_id: teamDoc.teams[i].players[n]})
                        players.push(player)
                        console.log(players, "PLAYERS")
                    }

                        res.render('teams/show.ejs', {
                        team: teamDoc.teams[i],
                        players,
                        allPlayers
                    });
                }
            };
        });
    });
};

// Create team
function create(req, res) {
    League.findById(req.params.id, function (err, leagueDoc) {
        //USE THIS FOR PROFILE STUFF
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        leagueDoc.teams.push(req.body);
        leagueDoc.save(function(err){
            res.redirect(`/leagues/${req.params.id}`);
        });
    });
};

//Delete team
function deleteTeam(req, res) {
    // Match team
    League.findOne({'teams._id': req.params.id,}, 
        function(err, leagueDoc){
            // no logged in user
            if(!leagueDoc) return res.redirect('/leagues');

            leagueDoc.teams.remove(req.params.id);
            leagueDoc.save();
            res.redirect(`/leagues/${leagueDoc._id}`)
        });
}
