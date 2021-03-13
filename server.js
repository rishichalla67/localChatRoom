// const io = require('socket.io')(3000)

// const users = {}


// io.on('connection', socket => {
//   socket.on('new-user', data => {
//     users[socket.id] = data.capitalName
//     socket.broadcast.emit('user-connected', { capitalName: data.capitalName, setBg: data.setBg})
//   })
//   socket.on('send-chat-message', data => {
//     socket.broadcast.emit('chat-message', { message: data.message, capitalName: data.users[socket.id], setBg: data.setBg })
//   })
//   socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
// })

  
const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', capitalName => {
    users[socket.id] = capitalName
    socket.broadcast.emit('user-connected', capitalName)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, capitalName: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})