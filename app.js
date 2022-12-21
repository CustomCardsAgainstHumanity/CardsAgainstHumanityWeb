const io = require('socket.io-client')
const socket = module.exports = io('http://localhost:8080')

socket.on('connect', () => {
  console.log(`You connected with id: ${[socket.id, socket.username]}`)
})