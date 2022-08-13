const League = require("../models/league");

module.exports = {
    create,
    delete: deleteTeam,
    show,
};

// Show team
function show(req, res) {
    console.log(req.params.id, " <-CORRECT ID")
    let teamPath = '';

    League.findOne({'teams._id': req.params.id,}, 
        function(err, teamDoc) {
            for (let i=0; i<teamDoc.teams.length; i++) {
                console.log(req.params.id, "REQ")
                teamPath = JSON.stringify(teamDoc.teams[i]._id);
                console.log(teamPath, "PATH")
                if(teamPath === `"${req.params.id}"`) {
                    res.render('teams/show.ejs', {
                        team: teamDoc.teams[i],
                    });
                }
            };
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
