const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const socket = require("socket.io");
const {v4:uuid} = require("uuid");
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
  // id -> uuid()  
  // author  -> username
  // content  ->string
  // likes -> [username]
  // createdAt -> date
// }
let Posts = []

io.on("connection",(client)=>{
  console.log("User 1 connected -> ",client.id);
  
  // register user
  client.on("register",(username)=>{
    Users[username] = client.id
  })
  
})

app.post("/post/create",async (req,res)=>{
  try {
    const {username,content} = req.body;
    const post = {
      id:uuid(),
      author:username,
      content,
      likes:[],
      createdAt: new Date()
    }
    Posts.unshift(post);
    io.emit("post update",Posts);
    res.status(201).json({posts:Posts})
  } catch (error) {
    res.status(401).json({message:error.message})
  }
})

app.post("/post/like/:id/:username",(req,res)=>{
  try {
    const {id,username} = req.params;
    let author;
    let content;
    Posts = Posts.map((post)=>{
      if(post.id==id){
        if(post.likes.includes(username)){
          throw new Error("Alredy Liked the post.")
        }
        author = post.author;
        content = post.content;
        post.likes.push(username)
      }
      return post;
    })

    if(Users[author] && Users[author] != Users[username]){
      io.to(Users[author]).emit("notification",`${username} liked your post ${content}`)
      io.emit("post update",Posts);
    }
    res.status(200).json({posts:Posts});
  } catch (error) {
    res.status(402).json({message:error.message})
  }
})

app.get("/post/all",(req,res)=>{
  res.status(200).json({posts:Posts})
})

app.get("/", (req, res) => {
  res.send("server running");
});



server.listen(PORT, () => console.log("Server running on port " + PORT));