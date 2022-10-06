const Player = require("../models/player");
const League = require("../models/league");

module.exports = {
  create,
  index,
  addToTeam,
  delete: deletePlayer,
  show,
  update,
  deleteFromTeam,
};

//Update Player
function update(req, res) {
  Player.findByIdAndUpdate(req.params.id, req.body, function (err, playerDoc) {
    playerDoc.save(function (err) {
      res.redirect("/players");
    });
  });
}

// Show player details
function show(req, res) {
  Player.findById(req.params.id, function (err, playerDoc) {
    res.render("players/show.ejs", {
      player: playerDoc,
    });
  });
}

// Remove player from team

function deleteFromTeam(req, res) {
  let playerPath = "";
  let leaguePath = "";

  League.findOne({ "teams._id": req.params.id }, function (err, leagueDoc) {
    // no logged in user
    if (!leagueDoc) return res.redirect("/leagues");

    for (let i = 0; i < leagueDoc.teams.length; i++) {
      for (let n = 0; n < leagueDoc.teams[i].players.length; n++) {
        playerPath = JSON.stringify(leagueDoc.teams[i].players[n]);
        // If the path matches the request by the client
        if (playerPath === `"${req.params.playerId}"`) {
          //Remove the team from the player's teams array
          Player.findById(
            leagueDoc.teams[i].players[n],
            function (err, playerDoc) {
              for (let x = 0; x < playerDoc.leagues.length; x++) {
                playerPath = JSON.stringify(playerDoc.leagues[x]._id);
                leaguePath = JSON.stringify(leagueDoc._id);
                if (playerPath === leaguePath) {
                  playerDoc.leagues.splice(x, 1);
                  playerDoc.save();
                }
              }
            }
          );

          // Remove the player from the actual team
          leagueDoc.teams[i].players.splice(n, 1);
          leagueDoc.save();

          res.redirect(`/teams/${leagueDoc.teams[i]._id}`);
        }
      }
    }
  });
}

// Delete the player
function deletePlayer(req, res) {
  Player.findByIdAndDelete(req.params.id, function (err) {
    res.redirect("/players");
  });
}

// Create player
function create(req, res) {
  Player.create(req.body, function (err) {
    res.redirect("/players");
  });
}

//Display Index
function index(req, res) {
  console.log(req.user);
  Player.find({}, function (err, players) {
    if (err) {
      res.send(
        "You have an error trying to find the leagues. Please call your system administrator."
      );
    }
    res.render("players/index.ejs", {
      players: players,
    });
  });
}

// Add player to team
function addToTeam(req, res) {
  // Finds the player
  Player.findById(req.body.playerId, function (err, playerDoc) {
    // Finds the team
    League.findOne({ "teams._id": req.params.id }, function (err, leagueDoc) {
      for (let i = 0; i < leagueDoc.teams.length; i++) {
        // Converts the ID path from an object to a string
        teamPath = JSON.stringify(leagueDoc.teams[i]._id);
        // If the path matches the request by the client
        if (teamPath === `"${req.params.id}"`) {
          // Adds player to team
          leagueDoc.teams[i].players.push(req.body.playerId);
          leagueDoc.save(function (err) {
            // Adds league to player
            playerDoc.leagues.push(leagueDoc);
            playerDoc.save(function (err) {
              res.redirect(`/teams/${leagueDoc.teams[i]._id}`);
            });
          });
        }
      }
    });
  });
}
