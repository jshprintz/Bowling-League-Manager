const League = require("../models/league");

module.exports = {
    create,
};

// Create team
function create(req, res) {
    console.log(req.user, "This is req.user")
    League.findById(req.params.id, function (err, leagueDoc) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log(req.body, "This is the req.body team!!")
        console.log(leagueDoc, "This is the leagueDOc")
        leagueDoc.teams.push(req.body);
        leagueDoc.save(function(err){
            res.redirect(`/leagues/${req.params.id}`);
        });
    });
};
