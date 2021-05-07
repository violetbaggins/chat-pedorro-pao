const path = require('path')
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getAllUsers} = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// set static
app.use(express.static(path.join(__dirname, 'public')));

const botName = "El viejo de Jurassic Park"

// run when a client connects
io.on('connection', socket => {
    // join user server side
    socket.on('joinUser', ({username}) => {

        const user = userJoin(socket.id, username);
        socket.join(user)

        // solo al user q se loguea
        socket.emit('message', formatMessage(botName, 'Welcome to Jurassic Park'));
        // broadcast when user connects
        socket.broadcast.emit('message', formatMessage(botName, `${user.username} entro a la conversación`));

       /*  // traer todos los usuarios logueados
        io.emit('roomUsers', {
            user: getAllUsers()
        })
 */

        // broadcast when user disconnects
        socket.on('disconnect', ()=>{
            io.emit('message', formatMessage(botName, `${user.username} se fue`))
        }  );
    })




    // listen for chat msg
    socket.on('chatMessage', msg =>{
        const user = getCurrentUser(socket.id)

        io.emit('message',formatMessage(user.username, msg));
    })

    
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running in port ${PORT}`))