const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("node:crypto");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

gameArray = [];
userArray = [];

var clients = {};
io.sockets.on("connection", (socket) => {
  console.log(`Server has connnected to id: ${socket.id}`);
  socket.on("loggedIn", (user) => {
    userArray.push(user);
    console.log(userArray);
    clients[user.uuid] = {
      socket: socket.id,
    };
  });

  socket.on("disconnect", function () {
    console.log(`Server has disconnected id: ${socket.id}`);
    for (var name in clients) {
      if (clients[name].socket === socket.id) {
        delete clients[name];
        break;
      }
    }
  });

  socket.on("checkPassword", (gameUUID, userPasswordInput) => {
    console.log(`gameUUID: ${gameUUID}`);
    const gamePassword = "idfk";
    socket.emit("passwordConfirmation", userPasswordInput == gamePassword);
  });

  socket.on("getAllGames", () => {
    socket.emit("retriveAllGames", gameArray);
  });

  socket.on("getAllUsers", () => {
    socket.emit("retrieveAllUsers", userArray);
  });

  socket.on("createNewGame", (options) => {
    gameArray.push(options);
    // io.sockets.connected[clients[options.hostUUID].socket].emit("a")
  });

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
app.use(urlLogger);
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});
app.use(express.static("views"));

app.use("/", require("./routes/login"));
app.use("/user", require("./routes/user"));
app.use("/game", require("./routes/game"));

function sessionChecker(req, res, next) {
  if (req.originalUrl.startsWith("/user/new/") || req.originalUrl == "/")
    return next();
  if (req.method != "POST" && !req.session.username /*|| !req.session.uuid*/)
    return res.redirect("/");
  next();
  // We aren't checking for missing a uuid as it isn't implemented.
}

function urlLogger(req, res, next) {
  ignoreUrls = ["/game.css"];
  if (!ignoreUrls.includes(req.originalUrl)) console.log(req.originalUrl);
  next();
}

server.listen(3000);
