const axios = require('axios');
const users = [];

// join user to chat
function userJoin(id, username){
    const user = {id, username};

    users.push(user);
    axios.get(`https://api.callmebot.com/whatsapp.php?phone=+5491168216144&text=Hay+un+user+en+el+CHAT!!!&apikey=759926`)
    .then(function (response){
        console.log("Resolvio DVD");
    })
    .catch(error => console.log(error));
    return user;
}

// Get current user
function getCurrentUser(id){
    return users.find(user => user.id === id)
}

// User leave
function userLeave(id){
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

// get all users
function getAllUsers(users){
    return users
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getAllUsers
}