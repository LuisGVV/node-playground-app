const socket = io();

socket.on('connect', function connect() {
    console.log(`Connected to server!`);
});

socket.on('disconnect', function disconnect() {
    console.log(`Disconnected from server!`);
});

socket.on('establishedConnection', function establishedConnection({ from, text }) {
    console.log(`From: ${from} \nText: ${text}`);
});

socket.on('newMessage', function newMessage(message) {
    console.log(`New Message received:`, JSON.stringify(message, undefined, 2));
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
});

$("#message-form").on("submit", function onSubmit(event) {
    event.preventDefault();

    var text = $("[name=message]").val();

    socket.emit('createMessage',
        {
            from: 'Frank',
            text,
        },
        function acknowledgeCreateMessage(data) {
            console.log(data);
        }
    );
});
