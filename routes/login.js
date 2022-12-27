const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login.ejs");
});
router.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
