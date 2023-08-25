// Node Server which will handle socket.io connections
// jshint esversion:6

const io = require('socket.io')(8000, 
    {
        cors: {
          origin: "*",
          credentials: true
        }
    }); // 8000 is port no. it can be any no.
const users = {};  
io.on('connection', socket =>{
    socket.on('new-user-joined', name => {
        console.log("new user", name); 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // to broadcast to all users except who joined newly
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive',{message : message, name: users[socket.id]});
    }); 

    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    }); 

});

