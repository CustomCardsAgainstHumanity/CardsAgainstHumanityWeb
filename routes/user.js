const express = require("express");
const router = express.Router();
const crypto = require("node:crypto")

const usersArray = []; // Users will be added to the database later down the line.

router.get("/new/:username", (req, res) => {
  res.redirect("/game/");

});

router.get("/logout", (req, res) => {
  
})

router.get("/list", (req, res) => {
  res.status(200).send(usersArray);
});
router.param("username", (req, res, next, username) => {
  req.session.username = username;
  req.session.uuid = crypto.randomUUID();
  const socket = require('socket.io-client')("http://localhost:3000");

  socket.once('connection', (socket) => {
    const user = {
      username: req.session.username,
      uuid: req.session.uuid,
    }
    usersArray.push(user)
    socket.emit("loggedIn", req.session.username, req.session.uuid)
  })
  next();
  
});

module.exports = router;
