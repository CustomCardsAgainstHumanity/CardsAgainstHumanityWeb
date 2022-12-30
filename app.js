const express = require("express");
const bodyParser = require("body-parser")
const session = require("express-session");
const crypto = require("node:crypto");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`Server has connnected to id: ${socket.id}`)
  socket.on("loggedIn", (username, uuid) => {
      console.log([username, uuid])
  });

  socket.on("checkPassword", (gameUUID, userPasswordInput) => {
    console.log(`gameUUID: ${gameUUID}`)
    const gamePassword = "idfk"
    socket.emit("passwordConfirmation", userPasswordInput == gamePassword)
  })

  socket.on("createNewGame", (options) => {});

  socket.on("joinNewGame", (room) => {
      socket.join(room);
  });

  socket.on("LeaveGame", () => {});

  socket.on("RemoveGame", () => {});
});

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

app.use("/", require("./routes/login"));
app.use("/user", require("./routes/user"));
app.use("/game", require("./routes/game"));

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

server.listen(3000);