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
    var template = $("#message-template").html(),
        formattedTime = moment(message.createdAt).format('h:mm a'),
        html = Mustache.render(
            template,
            {
                text: message.text,
                from: message.from,
                createdAt: formattedTime,
            }
        );

    $("#messages").append(html);
});

socket.on('newLocationMessage', function newLocationMessage(message) {
    var template = $("#location-message-template").html(),
        formattedTime = moment(message.createdAt).format('h:mm a'),
        html = Mustache.render(
            template,
            {
                from: message.from,
                createdAt: formattedTime,
                url: message.url,
            }
        );

    $("#messages").append(html);
});

$("#message-form").on("submit", function onSubmit(event) {
    event.preventDefault();

    var user = 'User',
        textInput = $("[name=message]"),
        text = textInput.val();

    if(text.trim() !== "") {
        socket.emit('createMessage',
            {
                from: user,
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
