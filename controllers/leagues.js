const League = require("../models/league");

module.exports = {
    index,
    new: newLeague,
    create,
    show,
    delete: deleteLeague,
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

//Show League
async function show(req, res) {
    try {
        const leagueDocument = await League.findById(req.params.id).exec();

        res.render('leagues/show', {
            league: leagueDocument,
        });

    } catch (err) {
        res.send(err);
    }
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