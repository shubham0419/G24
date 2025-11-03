const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server,{
  cors:{
    origin:"http://localhost:3000",
  }
});
const PORT = 4000;
const path = require("path");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))

//{ 
// "username":"socket.id"
// "username2":socket.id
// }
const Users = {};

//  post - > {
  // author  -> user
  // content  ->string
  // likes -> [user]
  // createdAt -> date 
// }
const Posts = []

io.on("connection",(client)=>{
  console.log("User 1 connected -> ",client.id);
  
  // register user
  client.on("register",(username)=>{
    Users[username] = socket.id
  })
  
})

app.get("/", (req, res) => {
  res.send("server running");
});

app.post("/create",async (req,res)=>{
  try {
    const {username,content} = req.body;
    const post = {
      author:username,
      content,
      likes:[],
      cretedAt:new Date()
    }
    Posts.unshift(post);
    res.status(201).json({posts:Posts})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

server.listen(PORT, () => console.log("Server running on port " + PORT));