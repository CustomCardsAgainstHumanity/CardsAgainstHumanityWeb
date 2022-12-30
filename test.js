let array = [
    "room1",
    "room2",
    "room3",
    "room4",
]

io.on("connection", socket => {
    socket.join(array[0]);
    socket.join(array[1]);
    socket.join(array[3]);

});
io.to("room1").to("room4").to("room3").emit("some event");