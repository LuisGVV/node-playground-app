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


    socket.on('createMessage', function createNewMessage({from, text}) {
        console.log(`New Message: `, JSON.stringify({from, text}, undefined, 2));

        io.emit(`newMessage`, {
            from: from,
            text: text,
            createdAt: new Date().getTime(),
        });
    });

    socket.on('disconnect', function disconnect() {
        console.log(`Client disconnected!`);
    });
});


