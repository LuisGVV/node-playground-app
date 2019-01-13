const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const { generateMsg } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(bodyParser.json());

server.listen(port, function listen() {
    console.log(`Started on port ${port}`);
});

io.on('connection', function listener(socket) {
    console.log('New user connected!');


    socket.emit('establishedConnection', generateMsg(`Admin`, `Welcome to the chat room!`));

    socket.broadcast.emit('newMessage', generateMsg(`Admin`, `New user joined`));

    socket.on('createMessage', function createNewMessage({ from, text }, acknowledge) {
        console.log(`New Message: `, JSON.stringify({ from, text }, undefined, 2));
        acknowledge('This parameter is set from the server and can be anything'); // this will call the provided callback in the front-end code
        socket.broadcast.emit(`newMessage`, generateMsg(from, text));
    });

    socket.on('disconnect', function disconnect() {
        console.log(`Client disconnected!`);
    });
});


