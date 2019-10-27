var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat message", function(msg) {
    console.log("message: " + JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});

http.listen(3210, function() {
  console.log("listening on *:3210");
});

//Serving HTML

//open new terminal window ---> node src/server/index.js
