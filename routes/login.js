const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const makeSocket = require("socket.io-client");

router.get("/", (req, res) => {
    res.render("login.ejs", { });
});

router.post("/", (req, res) => {
    req.session.loggedIn = true;
    req.session.user = {
        username: req.body.nickname,
        uuid: crypto.randomUUID(),
    }
    res.locals.user = req.session.user;
    res.redirect("/game");
});

module.exports = router;