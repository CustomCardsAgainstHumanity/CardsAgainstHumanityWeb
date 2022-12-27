const express = require("express");
const router = express.Router();

router.get("/new/:username", (req, res) => {
  res.redirect("/game/");
});

router.get("/logout", (req, res) => {
  
})

const users = []; // Users will be added to the database later down the line.
router.param("username", (req, res, next, username) => {
  //Check for already take Username
  req.session.username = username;
  req.session.uuid = crypto.randomUUID();
  users[username] = {
    username: req.session.username,
    uuid: req.session.uuid,
  };
  next();
});

module.exports = router;
