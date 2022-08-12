const League = require("../models/league");

module.exports = {
    index,
    new: newLeague,
    create,
    show,
    delete: deleteLeague,
    update,
    edit,
};

//Display Index
function index(req, res) {
    League.find({}, function (err, allLeagues) {
        console.log(allLeagues, "<- All of the leagues in the DB");

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
        res.render('leagues/show.ejs', {
            league: leagueDoc,
        })
    })
}

//Show League
function show(req, res) {
    League.findById(req.params.id, function(err, leagueDoc){
        res.render('leagues/show.ejs', {
            league: leagueDoc,
        });
    });
}

// Delete League
function deleteLeague(req, res) {
    League.findByIdAndDelete(req.params.id, function(err){
        res.redirect('/leagues');
    })
}


// Create league
function create(req, res) {
    console.log(req.body);
    League.create(req.body, function(err, leagueDoc){
        if (err) {
            console.log(err, "<- err in the leage create controller")
            return res.render("league/new.ejs");
        }
        res.redirect(`/leagues/${leagueDoc._id}`);
    })
}


//Render new page
function newLeague(req, res) {
    res.render("leagues/new.ejs");
}