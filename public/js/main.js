const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();



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
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}