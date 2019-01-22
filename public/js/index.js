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

socket.on('newLocationMessage', function newLocationMessage(message) {
    console.log(`New Message received:`, JSON.stringify(message, undefined, 2));
    var li = $('<li></li>'),
        a = $('<a target="_blank">My current location</a>');
        
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);

    $("#messages").append(li);
});

$("#message-form").on("submit", function onSubmit(event) {
    event.preventDefault();

    var textInput = $("[name=message]"),
        text = textInput.val();

    if(text.trim() !== "") {
        socket.emit('createMessage',
            {
                from: 'Frank',
                text,
            },
            function acknowledgeCreateMessage(_data) {
                textInput.val("");
            }
        );
    }
});

var locationButton = $("#send-location");

locationButton.on("click", function onClick(_event) {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr("disabled", "disabled").text("Sending...");;

    navigator.geolocation.getCurrentPosition(
        function success({ coords: { latitude, longitude } }) {
            locationButton.removeAttr("disabled").text("Send location");
            socket.emit('sendLocation',
                {
                    latitude,
                    longitude,
                },
                function acknowledgeSendLocation(data) {
                    console.log(data);
                }
            );
        },
        function error() {
            locationButton.removeAttr("disabled").text("Send location");
            alert("Unable to prompt location");
        }
    );
});
