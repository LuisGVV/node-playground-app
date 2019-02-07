const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const { generateMsg, generateLocationMsg } = require('./utils/message');
const { isValidString } = require('./utils/validators');
const { Users } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

var users = new Users();

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(bodyParser.json());

server.listen(port, function listen() {
    console.log(`Started on port ${port}`);
});

io.on('connection', function listener(socket) {

    socket.on("join", function onJoin(params, callback) {
        if (!isValidString(params.username) || !isValidString(params.chatroom)) {
            return callback("Invalid params");
        }

        socket.join(params.chatroom);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.username, params.chatroom);

        io.to(params.chatroom).emit("updateUserList", users.getUserList(params.chatroom));
        socket.emit('newMessage', generateMsg(`Admin`, `Welcome to the chat room!`));

        socket.broadcast.to(params.chatroom).emit(
            'newMessage',
            generateMsg(
                `Admin`,
                `${params.username} has joined the room`
            )
        );

        callback();
    });

    socket.on('createMessage', function createNewMessage({ text }, acknowledge) {
        var user = users.getUser(socket.id);

        if (user && isValidString(text) ) {
            io.to(user.room).emit(`newMessage`, generateMsg(user.name, text));
        }
    });

    socket.on('sendLocation', function sendLocation({ latitude, longitude }, _acknowledge) {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit(`newLocationMessage`, generateLocationMsg(user.name, { latitude, longitude }));
        }
    });

    socket.on('disconnect', function disconnect() {
        var userRemoved = users.removeUser(socket.id);
        console.log(`${userRemoved.name} disconnected`);
        console.log(`user list: ${JSON.stringify(users.getUserList(userRemoved.chatroom), undefined, 2)}`);
        if(userRemoved) {
            io.to(userRemoved.room).emit("updateUserList", users.getUserList(userRemoved.room));
            io.to(userRemoved.room).emit("newMessage", generateMsg("Admin", `${userRemoved.name} has left`));
        }
    });
});


