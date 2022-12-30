const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  delete require.cache[require.resolve('.././views/login.ejs')];
  res.render("login.ejs");
});
router.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
