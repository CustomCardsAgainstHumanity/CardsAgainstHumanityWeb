const express = require("express");
const router = express.Router();

router.get("/new/:username", (req, res) => {
  res.send(`User Get user with username: ${req.params.username}`);
});

const users = []; // Users will be added to the database later down the line.
router.param("username", (req, res, next, username) => {
  //Check for already take Username
  req.session.username = username;
  req.session.uuid = ""; // 32Char long string... Needs to be made, just not got around to it
  users[username] = {
    username: req.session.username,
    uuid: req.session.uuid,
  };
  next();
});

module.exports = router;