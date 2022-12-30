const express = require("express");
const router = express.Router();
const crypto = require("node:crypto");

router.get("/new/", (req, res) => {
  res.redirect("/")
})

router.get("/new/:username", (req, res) => {
  const socket = require("socket.io-client")("http://localhost:3000");
  socket.once("connect", async () => {
    const user = {
      username: req.session.username,
      uuid: req.session.uuid,
      socketID: socket.id
    };
    socket.emit("getAllUsers");
      await socket.on("retrieveAllUsers", (userArray) => {
        let doesUserAlreadyExist =
          userArray.filter(function (element) {
            return element.username == req.session.username;
          }).length > 0;
        if (doesUserAlreadyExist) return res.redirect('/?error=invalid_nickname');
        //socket.join(user.socketID).emit("loggedIn", user);
        socket.emit("loggedIn", user);
        res.redirect("/game/");
      });
  })
});

router.get("/logout", (req, res) => {
  /*
  req.session.destroy(() => {
    // disconnect all Socket.IO connections linked to this session ID
    io.to(sessionId).disconnectSockets();
    res.status(204).end();
  });
  */
});

router.get("/list", (req, res) => {
  res.status(200).send(userArray);
});
router.param("username", (req, res, next, username) => {
  req.session.username = username;
  req.session.uuid = crypto.randomUUID();
  next();
});

module.exports = router;
