const League = require("../models/league");
const Player = require("../models/player");

module.exports = {
    index,
    create,
    show,
    delete: deleteLeague,
    update,
    edit,
};

//Display Index
function index(req, res) {
    League.find({}, function (err, allLeagues) {
        if (err) {
            res.send("You have an error trying to find the leagues. Please call your system administrator.")
        };
        res.render('leagues/index.ejs', {
            league: allLeagues,
        });
    });
};

// Display edit page
function edit(req, res) {
    League.findById(req.params.id, function(err, leagueDoc){
        res.render("leagues/edit.ejs", {
            league: leagueDoc,
        });
    });
}

//Update League
function update(req, res) {
    League.findByIdAndUpdate(req.params.id, req.body, function(err, leagueDoc){
        leagueDoc.save(function(err){
            res.redirect('/leagues');
        })
    })
}

//Show League
function show(req, res) {
    League.findById(req.params.id, function(err, leagueDoc){
        Player.find({_id: {$nin: leagueDoc.teams.players}}, function(err, players){
            res.render('leagues/show.ejs', {
                league: leagueDoc,
                players: players,
            });
        })
    });
}

// Delete League
function deleteLeague(req, res) {
    League.findByIdAndDelete(req.params.id, function(err, leagueDoc){
        Player.find({}, function(err, allPlayers){
            for (let i=0; i<allPlayers.length; i++){
                for (let n=0; n<allPlayers[i].leagues.length; n++){
                    if(allPlayers[i].leagues[n].leagueName === leagueDoc.leagueName){
                        allPlayers[i].leagues.splice(n, 1); 
                        allPlayers[i].save(function(err){
                            res.redirect('/leagues'); 
                        })                   
                    }
                }
            }
        })
    })
}


// Create league
function create(req, res) {
    League.create(req.body, function(err, leagueDoc){ 

        if (err) {
            console.log(err, "<- err in the leage create controller")
            return res.render("league/new.ejs");
        }
        res.redirect(`/leagues/${leagueDoc._id}`);
    })
}
