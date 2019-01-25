## Socket.io

Behind the scenes scoket.io uses the native http module provided by node. 

The websocket protocol enables a two-way communication between a client and a remote host which upon both have agreed to communicate. The protocol opens a handshake followed by the message framing over TCP. The inital request is a GET request with an upgrade offer. 

The purpose of websockets is to provide a communaction with servers that doesn't rely on opening multiple HTTP requests.

On the node backend install the socket.io library, and pass the server instance to the socket function you required.

In the front-end hitting `/socket.io/socket.io.js` will serve the appropiate library to communicate with the back-end.

## ESLint

Extending from a ESLint doesn't allow the current config file to override its rules. The only workaround is using the plug-in in folders where needed.

## MustacheJS

Templating is easily done with MustacheJS instead of manipulating directly the DOM

Simply include a `type=text/template` script and Mustache can apply the templating passing an object with the properties