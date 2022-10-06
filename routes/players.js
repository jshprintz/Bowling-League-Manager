const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");
const isLoggedIn = require("../config/auth");

//Index
router.get("/players", playersController.index);
// Create player
router.post("/players", isLoggedIn, playersController.create);
// Add player to team
router.post("/teams/:id/players", isLoggedIn, playersController.addToTeam);
// Delete Player
router.delete("/players/:id", isLoggedIn, playersController.delete);
// Show Player
router.get("/players/:id", isLoggedIn, playersController.show);
// Update PLayer
router.put("/players/:id", isLoggedIn, playersController.update);
// Delete from team
router.delete(
  "/teams/:id/players/:playerId",
  isLoggedIn,
  playersController.deleteFromTeam
);

module.exports = router;
