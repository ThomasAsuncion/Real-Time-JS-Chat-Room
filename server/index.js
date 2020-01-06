// We need to require all the necessary dependencies. No imports like React.js because this is Node.js and this is how we import (require):
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000; // With either simply run on port 5000 or when we go to deploy it will require a specific port to run on

const router = require('./router'); // imports (or requires) the router we created in router.js

const app = express();
const server = http.createServer(app); // intializes the server with the app that was created with express
const io = socketio(server); // creates an instance of the socket with passing in the server

app.use(router); // uses the router we created in router.js
app.use(cors()); // Needs for deployment for restriction resource over deployment

// A function that is from socketio (see more on https://socket.io/). The socket that is passed is a socket that will be connected from a client side socket
io.on('connection', (socket) => {
    console.log('We have a new connection.'); // Just to know when the new connection that actually occurs

    // Gets the info that was on the front end. Notice that 'join' is the same name that was declared in Chat.js: socket.emit('join', {name, room}); where name and room were passed too.. 49:05 on video learn more about callback 
    socket.on('join', ({ name, room }, callback) => {
        console.log(`name: ${name}`, `room: ${room}`);
        const { error, user } = addUser( {id: socket.id, name, room} ); // Use {} curly braces to destructure an object. The id comes from our socket object that is made by socketio
        if(error) return callback(error); // Error is actually coming from users.js dynamically, if there is an error we will automatically get kicked from this function due to the return statement
        
        // If there are no errors we can now call in the built in join method from socket which will add a user to the name of the room we want
        socket.emit('message', { user: 'admin', text: `Hey ${user.name}! Welcome to the room: ${user.room}.` }); // Welcomes the specific user to the chat room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` }) // Sends a message to all users besides the specific user that the specific user has joined
        socket.join(user.room); 

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)}) // Logic to see what other users are in the room were getUsersInRoom() takes in the parameter of the room it needs to look for users in

        callback(); // Always have a callback so we can do something after a message has been sent on the front end
    }); 

    // Admin generated are 'message' while user generated messages are 'sendMessage'
    // We are waiting on sendMessage because we're expecting it from the back end (emit happens on front end | on expects something to happen on back end)
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id); // socket is a specific client user instance
        io.to(user.room).emit('message', { user: user.name, text: message }); // Specifies the room name that the user is currently in and emits or sends a message to send where the user is the name and the message is inputted in the front end
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) }); // Needs to know when another leaves so we send the data to roomData because we need to know the new state of the users in the room

        callback(); // Always have a callback so we can do something after a message has been sent on the front end
    }) 


    // Used for when a user disconnects (managing the same socket above)
    socket.on('disconnect', () => {
        const user = removeUser(socket.id); // Simply removes the user by storing the removed user in a variable so that we can display which user has left (by getting it's id)
        
        // A nice little message that will display out to the room that the user was in with emitting message from an admin that says the user has left
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left.`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)}) // Adjusts the 'OnlineUsers' list accordingly when a User Leaves: (when 'roomData' is sent the room will be the room the current user is in and it will get all the users in that room)
        }

        console.log(`User has disconnected.`)
    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`)); // Makes the server running will also display port of running on console

