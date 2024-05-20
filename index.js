const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const filepath = __dirname + "/index.html";
  res.sendFile(filepath);
});

server.listen(port, () => {
  console.log("server is running on port", port);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // handling the msg we sent from the client to server, this msg is currently on the server but havn't reached the peers yet, we would need to broadcast for that
  socket.on("chat msg", (userMessage) => {
    // broadcasting this msg to each peer

    // we use io.emit() to send the msg to everyone (including the sender) ex -io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
    // we use socket.broadcast.emit() to send the msg except the sender ex - socket.broadcast.emit('hi');

    io.emit("chat msg", userMessage);
  });
});
