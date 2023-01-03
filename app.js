const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const crypto = require("node:crypto");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("views"))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.redirect("/login");
});

app.use(session({
    secret: crypto.randomUUID(),
    resave: false,
    saveUninitialized: true
}));

app.use("/game", require("./routes/game"));
app.use("/login", require("./routes/login"));

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000);
module.exports = app;