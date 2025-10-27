const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = 5000;
const path = require("path")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

io.on('connection', client => {
  console.log("server side connection",client.id);
  client.on('disconnect', () => {
    console.log("user 1 disconnected");
   });
});

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(PORT, () => console.log("Server running on port " + PORT));