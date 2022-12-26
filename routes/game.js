const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("gameSearch.ejs");
});

router.get("/create", (req, res) => {
    res.render("gameSearch.ejs");
});
  
router.get("/refresh", (req, res) => {
    gameArray = {
        name: "Razor",
        password: true,
        currentPlayers: 2,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "Not Started", // Not Started, In Progress
        players: ["Razor", "Khao"],
        spectators: [""], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]

    }
    // Retrive all games from the server
    // If the search is empty
        // Return all games
    // If the search is not empty
        // Find all games that match the search
        // Return the games that match the search
    req.gameArray = gameArray;
    res.render("gameSearch.ejs");
});

module.exports = router;
