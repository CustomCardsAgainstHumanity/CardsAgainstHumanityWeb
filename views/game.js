async function JoinGame(playerName, gameUUID, type = "player", locked = 'false') {
    console.log("Function Executed")
    const socket = io("http://localhost:3000/");
    console.log("Socket Created")
    socket.once("connect", async () => {
        console.log("Socket Connected")
        if (locked == 'true') {
            let passwordInput = prompt("Enter the game's password.");
            if (passwordInput == null || passwordInput == "") return;
            socket.emit('checkPassword', gameUUID, passwordInput)
            await socket.once('passwordConfirmation', (success) => {
                if (!success) return alert("The password was incorrect!")
                sendPOSTgameJoin(playerName, gameUUID, type, locked)
            })
            socket.disconnect();
        } else {
            sendPOSTgameJoin(playerName, gameUUID, type, locked)
        }
        function sendPOSTgameJoin(playerName, gameUUID, type, locked) {
            fetch(`/game/join${locked === 'true' ? "/locked" : ""}`, {
                method: 'POST',
                body: JSON.stringify({
                    playerType: type,
                    playerName: playerName,
                    gameUUID: gameUUID
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    })
    socket.disconnect();
}