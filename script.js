const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

const userName = prompt('What is your name?')
// capitalize name
function capitalize(userName) {
    return userName.charAt(0).toUpperCase() + userName.slice(1);
  }
  
const capitalName = userName.split(' ').map(capitalize).join(' ');
appendMessage(`Welcome to the chat room!`)
socket.emit('new-user', capitalName)


socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', capitalName => {
    appendMessage(`${capitalName} connected`)
})

socket.on('user-disconnected', capitalName => {
    appendMessage(`${capitalName} disconnected`)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}