const socket = io();

socket.on('connect', function connect() {
    console.log("Connected to server!");

    socket.emit("createMessage", {
        from: "Luis",
        text: "Meet me at 2pm",
    });
});

socket.on('disconnect', function disconnect() {
    console.log("Disconnected from server!");
});

socket.on('newMessage', function newMessage(message) {
    console.log(`New Message sent`, JSON.stringify(message, undefined, 2));
});
