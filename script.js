// const socket = io('http://localhost:3000')
// const messageContainer = document.getElementById('message-container')
// const messageForm = document.getElementById('send-container')
// const messageInput = document.getElementById('message-input')

// const userName = prompt('What is your name?')
// // capitalize name
// function capitalize(userName) {
//   return userName.charAt(0).toUpperCase() + userName.slice(1);
// }

// const capitalName = userName.split(' ').map(capitalize).join(' ');
// appendMessage(`Welcome to the chat room!`)

// function setBgRandom() {
//   const randomColor = Math.floor(Math.random()*16777215).toString(16);
//   if(randomColor < FFE) {
//     document.body.style.backgroundColor = "#" + randomColor;
//     color.innerHTML = "#" + randomColor;
//   } else {
//     setBg();
//   }
//   return randomColor
// }

// setBg = setBgRandom()
// console.log(setBg)
// socket.emit('new-user', { capitalName: capitalName, setBg: setBg})

// socket.on('chat-message', data => {
//   appendMessage(`${data.capitalName}: ${data.message}`, data.setBg)
  
// })

// socket.on('user-connected', data => {
//   appendMessage(`${data.capitalName} connected`, data.setBg)
  
// })

// socket.on('user-disconnected', capitalName => {
//   appendMessage(`${capitalName} disconnected`)
// })

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`, setBg)
//   document.getElementById(setBg).style.backgroundColor=setBg;
//   socket.emit('send-chat-message', { message: message, setBg: setBg})
//   messageInput.value = ''
// })

// function appendMessage(message, setBg) {
//   const messageElement = document.createElement('div')
//   messageElement.background = setBg
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }

const socket = io('https://rishichalla67.github.io/localChatRoom/')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const usersColors = {}


const userName = prompt('What is your name?')

// capitalize name
function capitalize(userName) {
  return userName.charAt(0).toUpperCase() + userName.slice(1);
}

const capitalName = userName.split(' ').map(capitalize).join(' ');

function randomColor() {
  var letters = 'ACDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

console.log(randomColor())

appendMessage(`Welcome to the chat room!`, '#CCC')
socket.emit('new-user', capitalName)

socket.on('chat-message', ({message, capitalName}) => {
  console.log(capitalName ,usersColors)
  appendMessage(`${capitalName}: ${message}`, usersColors[capitalName])
})

socket.on('user-connected', capitalName => {
  usersColors[capitalName] = randomColor()
  console.log(socket.id)
  appendMessage(`${capitalName} connected`, '#CCC')
})

socket.on('user-disconnected', capitalName => {
  appendMessage(`${capitalName} disconnected`, '#CCC')
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`, '#DDD')
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message, bgId) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageElement.style.backgroundColor = bgId
  console.log(messageElement, bgId)
  messageContainer.append(messageElement)
}