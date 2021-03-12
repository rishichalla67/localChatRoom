const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
      },
});

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const rooms = {}

app.get('/', (req, res) => {
    res.render('index', {rooms: rooms})
})

app.get('/:room', (res, req) => {
    res.render('room', {roomName: req.params.room})
})

server.listen(3000)

const users = {}

// Runs code everytime someone loads site, each user gets a socket and sends message
io.on('connection', socket => {
    socket.on('new-user', capitalName => {
        users[socket.id] = capitalName
        socket.broadcast.emit('user-connected', capitalName)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
    })
    socket.off('disconnect', () => {
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id]
    })
})