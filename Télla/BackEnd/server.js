const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const format = require('../BackEnd/Utils/texts');
const { userjoin, getcurrentuser, userleft, getroomusers } = require('../BackEnd/Utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
 

app.use(express.static(path.join(__dirname, '../FrontEnd/Interface')));
 
const appAI = 'Aunt Télla';
io.on('connection',socket => {
    console.log('New Socket Connected');
socket.on('join', ({username, room}) => {
     
const user = userjoin(socket.id,
        username, room);
        socket.on('chatmessage', msg => {
            const user = getcurrentuser(socket.id, username);

            io.to(user.room).emit('message', format(username, msg, room));
        });
        socket.join(user.room);

        socket.emit('message', format(appAI, `Welcome ${user.username}. Get chatting!`));

    socket.broadcast.to(user.room).emit('message',  format(appAI,`${user.username} Joined the Chat!`));
    //people in the room
   
    socket.on('chat-messages', msg => {
        const user = getcurrentuser(socket.id)
       io.to(user.room).emit('message', format( user.username.username, msg))
    })
    socket.on('disconnect', () => { 
        const user = userleft(socket.id);
        if (user){
            socket.broadcast.to(user.room).emit('message',  format(appAI,`${user.username} Left the Chat😭`));
            io.to(user.room).emit('Chatters',{
                room: user.room,
                users: getroomusers(user.room)
            });
            console.log('Chatters event emitted');
        }
     });
});


 
   

}); 


const PORT = process.env.PORT||5000 ;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));

