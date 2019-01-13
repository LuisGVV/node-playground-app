## Socket.io

Behind the scenes scoket.io uses the native http module provided by node. 

The websocket protocol enables a two-way communication between a client and a remote host which upon both have agreed to communicate. The protocol opens a handshake followed by the message framing over TCP. The inital request is a GET request with an upgrade offer. 

The purpose of websockets is to provide a communaction with servers that doesn't rely on opening multiple HTTP requests.

## ESLint

Extending from a ESLint doesn't allow the current config file to override its rules. The only workaround is using the plug-in in folders where needed.