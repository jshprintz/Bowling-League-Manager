const League = require("../models/league");

module.exports = {
    index,
    new: newLeague,
};

function index(req, res) {
    League.find({}, function (err, allLeagues) {
        console.log(allLeagues, "<- All of the leagues in the DB");

        if (err) {
            res.send("You have an error trying to find the leagues. Please call your system administrator.")
        };
    });
};

function newLeague(req, res) {
    res.render("leagues/new.ejs");
}