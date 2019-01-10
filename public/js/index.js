const socket = io();

socket.on('connect', function connect() {
    console.log(`Connected to server!`);
});

socket.on('disconnect', function disconnect() {
    console.log(`Disconnected from server!`);
});

socket.on('establishedConnection', function establishedConnection({from, text}) {
    console.log(`From: ${from} \nText: ${text}`);
});

socket.on('newUserJoined', function newUserJoined({from, text}) {
    console.log(`From: ${from} \nText: ${text}`);
});

socket.on('newMessage', function newMessage(message) {
    console.log(`New Message received:`, JSON.stringify(message, undefined, 2));
});
