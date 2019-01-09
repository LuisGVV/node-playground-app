const socket = io();

socket.on('connect', function connect() {
    console.log(`Connected to server!`);
});

socket.on('disconnect', function disconnect() {
    console.log(`Disconnected from server!`);
});

socket.on('newMessage', function newMessage(message) {
    console.log(`New Message received:`, JSON.stringify(message, undefined, 2));
});
