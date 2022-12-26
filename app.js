const express = require("express");
const session = require("express-session");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(sessionChecker);

const loginRouter = require("./routes/login");

app.use("/", loginRouter);

const userRouter = require("./routes/users");

app.use("/user", userRouter);

function sessionChecker(req, res, next) {
  if (req.originalUrl.startsWith("/user/new/") || req.originalUrl == "/") return next();
  if (!req.username /*|| !req.uuid*/) return res.redirect("/");
  // We aren't checking for missing a uuid as it isn't implemented.
}

app.listen(3000);
