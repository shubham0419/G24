"use client"
import axios from "axios";
import { Heart, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggenIn,setIsLoggedIn] = useState(false);
  const [username,setUsername] = useState("");
  const [content,setContent] = useState("");
  const [posts,setPosts] = useState([]);
  const [refresh,setRefresh] = useState(0);

  // socket client initialise
  useEffect(()=>{
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  },[])

  const gettAllPosts = async ()=>{
    if(isLoggenIn){
      let res = await axios.get("http://localhost:4000/post/all");
      setPosts(res.data.posts);
    }
  }

  useEffect(()=>{
    gettAllPosts();
  },[refresh])

  // client connection
  useEffect(()=>{
    socket?.on("connect",()=>{
      console.log("user connected",socket.id);
    })
  },[socket])

  const handleSubmit = (e)=>{
    e.preventDefault();
    socket.emit("register",username);
    setIsLoggedIn(true);
    setRefresh(prev=>prev+1);
  }



  if(!isLoggenIn){
    return (
      <div className="h-screen w-full bg-white text-black flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border rounded-md p-5">
          <label form="username">Username</label>
          <input onChange={(e)=>setUsername(e.target.value)} className="border" id="username" placeholder="Enter Name"/>
          <button className="border bg-blue-300 rounded-lg">Register</button>
        </form>
      </div>
    )
  }

  const handlePostCreate = async (e)=>{
    e.preventDefault();
    let payload = {
      username,
      content
    }
    let res = await axios.post("http://localhost:4000/post/create",payload);
    if(res.status==201){
      setRefresh(prev=>prev+1);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}!!</h1>

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md p-5">
          <label form="username">Create Tweet</label>
          <textarea rows={3} cols={7} onChange={(e)=>setContent(e.target.value)} className="border" id="username" placeholder="Enter Name"/>
          <button className="border bg-blue-300 rounded-lg">Post</button>
        </form>

      <div className="p-5 flex flex-col gap-3">
          {posts?.map((post,indx)=>{
            return <div key={indx} className="p-4 border rounded-lg shadow-md">
            <div className="flex gap-2 items-center">
              <User className="h-7 w-7 border rounded-full"/>
              <h4 className="text-lg font-semibold">{post.author}</h4>
            </div>
              <p className="text-xl">{post.content}</p>
              <p className="text-sm text-gray-400 float-end">{post.createdAt}</p>
              <div className="flex">{post.likes.includes(username)?<Heart fill="red" className="mr-2"/>
              :<Heart className="mr-2"/>} {post.likes.length} Likes</div>
            </div>
          })}
      </div>
    </div>
  );
}