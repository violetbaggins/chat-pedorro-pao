const path = require('path')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// set static
app.use(express.static(path.join(__dirname, 'public')));


// run when a client connects
io.on('connection', socket => {
    // console.log('web socket connection 3');

    // solo al user q se loguea
    socket.emit('message', 'Welcome to Jurassic Park');

    // broadcast when user connects
    socket.broadcast.emit('message', 'user joined chat');

    // broadcast when user disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', 'user left chat')
    }  );

    // listen for chat msg
    socket.on('chatMessage', msg =>{
        io.emit('message', msg);
    })

    
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running in port ${PORT}`))