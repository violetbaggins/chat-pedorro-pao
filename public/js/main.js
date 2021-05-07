const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const userList = document.getElementById('users')
const socket = io();

let query = new URLSearchParams(location.search)
let username = query.get('username')



// joinUser
socket.emit('joinUser', {username})

// get users to front
/* socket.on('roomUsers', ({users}) =>{
    outputUsers(users)
}) */

socket.on('message', message => {
    // console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// message submit
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    // capturar el texto que escribio el user 
    const msg = e.target.elements.msg.value;

    // Aca mando el mensaje que escribe el user al server
    socket.emit('chatMessage', msg);

    // clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

/* function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join(' ')}
    `
} */