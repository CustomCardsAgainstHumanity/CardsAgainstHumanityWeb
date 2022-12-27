const express = require("express");
const bodyParser = require("body-parser")
const crypto = require("crypto")
const session = require("express-session");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(
  session({
    secret: crypto.randomUUID(),
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true })); //add this
app.use(bodyParser.json());
app.use(sessionChecker);
app.use(urlLogger)
app.use(express.static('views'))

const loginRouter = require("./routes/login");

app.use("/", loginRouter);

const userRouter = require("./routes/user");

app.use("/user", userRouter);

const gameRouter = require("./routes/game");

app.use("/game", gameRouter);

function sessionChecker(req, res, next) {
  if (req.originalUrl.startsWith("/user/new/") || req.originalUrl == "/") return next();
  if (req.method != "POST" && (!req.session.username /*|| !req.session.uuid*/)) return res.redirect("/");
  next();
  // We aren't checking for missing a uuid as it isn't implemented.
}

function urlLogger(req, res, next) {
    ignoreUrls = [
      "/game.css"
    ]
    if (!ignoreUrls.includes(req.originalUrl)) console.log(req.originalUrl)
    next();
}

app.listen(3000);
