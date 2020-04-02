// Require express; declare app variable
let express = require('express')
let app = express()

// Configure http and socket.io
let http = require('http').Server(app)
let io = require('socket.io')(http)

// Define home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Define socket settings (listeners)
io.on('connection', socket => {
  console.log('Someone has connected')

  socket.on('chat message', message => {
    // We've received a chat message event from one of our clients
    // Now, broadcast it to everyone
    io.emit('chat message', message)
  })

  socket.on('disconnect', () => {
    console.log('Byeeee')
  })
})

// Listen on port 3000
http.listen(3000, () => {
  console.log('Listening!')
})
