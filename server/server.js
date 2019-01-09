const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

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

    socket.emit('newMessage', {
        from: `Jhon`,
        text: `C ya then!`,
        createdAt: new Date(),
    });

    socket.on('disconnect', function disconnect() {
        console.log(`Client disconnected!`);
    });

    socket.on('createMessage', function createNewMessage(newMessage) {
        newMessage.createdAt = new Date();
        console.log(`New Message: `, JSON.stringify(newMessage, undefined, 2));
    });
});


