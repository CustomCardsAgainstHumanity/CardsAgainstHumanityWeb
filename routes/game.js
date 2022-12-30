const express = require("express");
const router = express.Router();
const crypto = require("node:crypto");

router.get("/", (req, res) => {
  delete require.cache[require.resolve(".././views/gameSearch.ejs")];
  res.render("gameSearch.ejs", {
    currentUser: req.session.username,
    gameArray: gameArray,
  });
});
router.get("/list", (req, res) => {
  res.status(200).send(gameArray);
});

router.get("/create", async (req, res) => {
  const socket = require("socket.io-client")("http://localhost:3000");
  socket.once("connect", async () => {
    const options = {
      host: req.session.username,
      hostUUID: req.session.uuid,
      gameUUID: crypto.randomUUID(),
      password: false,
      currentPlayers: 0,
      maxPlayers: 10,
      currentSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
      maxSpectators: 0, // SPECTATORS WILL NOT BE ADDED TILL LATER ON
      progress: "Not Started", // Not Started, In Progress
      players: [],
      spectators: [], // SPECTATORS WILL NOT BE ADDED TILL LATER ON
      goal: 10,
      cardPacks: [],
    };
    socket.emit("createNewGame", options);
  });
  delete require.cache[require.resolve(".././views/gameSearch.ejs")];
  socket.once("connect", async () => {
    socket.emit("getAllGames")
    await socket.on("retriveAllGames", (gameArray) => {
      res.render("gameSearch.ejs", {
        currentUser: req.session.username,
        gameArray: gameArray,
      });
    })
  })
  // create game menu lol
});

router.get("/refresh", async (req, res) => {
  delete require.cache[require.resolve(".././views/gameSearch.ejs")];
  const socket = require("socket.io-client")("http://localhost:3000");
  socket.once("connect", async () => {
    socket.emit("getAllGames")
    await socket.on("retriveAllGames", (gameArray) => {
      res.render("gameSearch.ejs", {
        currentUser: req.session.username,
        gameArray: gameArray,
      });
    })
  })
});

router.post("/join", (req, res) => {
  console.log(req.body.playerName);
  console.log(
    `${req.body.playerName} wants to join a public game (${req.body.gameUUID}).`
  );
  res.send(
    `${req.body.playerName} wants to join a public game (${req.body.gameUUID}).`
  );
});

router.post("/join/locked", (req, res) => {
  console.log(req.body.playerName);
  console.log(
    `${req.body.playerName} wants to join a locked game (${req.body.gameUUID}).`
  );
  res.send(
    `${req.body.playerName} wants to join a locked game (${req.body.gameUUID}).`
  );
});

module.exports = router;
