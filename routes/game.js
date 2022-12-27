const express = require("express");
const router = express.Router();

    // Retrive all games from the server
    // If the search is empty
        // Return all games
    // If the search is not empty
        // Find all games that match the search
        // Return the games that match the search
gameArray = [
    {
        host: "Razor",
        gameUUID: crypto.randomUUID(),
        password: false,
        currentPlayers: 2,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "In Progress", // Not Started, In Progress
        players: ["Razor", "Khao"],
        spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]
    },
    {
        host: "Razor",
        gameUUID: crypto.randomUUID(),
        password: true,
        currentPlayers: 0,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "In Progress", // Not Started, In Progress
        players: [],
        spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]
    },
    {
        host: "Razor",
        gameUUID: crypto.randomUUID(),
        password: true,
        currentPlayers: 0,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "Not Started", // Not Started, In Progress
        players: [],
        spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]
    },
    {
        host: "Razor",
        gameUUID: crypto.randomUUID(),
        password: true,
        currentPlayers: 0,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "Not Started", // Not Started, In Progress
        players: [],
        spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]
    },
    {
        host: "Razor",
        gameUUID: crypto.randomUUID(),
        password: true,
        currentPlayers: 0,
        maxPlayers: 10,
        currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        progress: "Not Started", // Not Started, In Progress
        players: [],
        spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
        goal: 10,
        cardPacks: ["Some card pack"]
    },
]

router.get("/", (req, res) => {
    res.render("gameSearch.ejs", { currentUser : req.session.username, gameArray: gameArray });
});
router.get("/list", (req, res) => {
    res.status(200).send(gameArray);
});

router.get("/create", (req, res) => {
    res.render("gameSearch.ejs", { currentUser : req.session.username, gameArray: gameArray });
});
  
router.get("/refresh", (req, res) => {
    res.render("gameSearch.ejs", { currentUser : req.session.username, gameArray: gameArray });
});

router.post("/join", (req, res) => {
    console.log(req.body.playerName)
    console.log(`${req.body.playerName} wants to join a public game (${req.body.gameUUID}).`)
    res.send(`${req.body.playerName} wants to join a public game (${req.body.gameUUID}).`)
})

router.post("/join/locked", (req, res) => {
    console.log(req.body.playerName)
    console.log(`${req.body.playerName} wants to join a locked game (${req.body.gameUUID}).`)
    res.send(`${req.body.playerName} wants to join a locked game (${req.body.gameUUID}).`)
})

module.exports = router;
