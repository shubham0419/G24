"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggenIn,setIsLoggedIn] = useState(false);
  const [username,setUsername] = useState("");
  const [content,setContent] = useState("");

  // socket client initialise
  useEffect(()=>{
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  },[])

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
  }

  return (
    <div className="h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}!!</h1>

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md p-5">
          <label form="username">Create Tweet</label>
          <textarea rows={3} cols={7} onChange={(e)=>setContent(e.target.value)} className="border" id="username" placeholder="Enter Name"/>
          <button className="border bg-blue-300 rounded-lg">Post</button>
        </form>
    </div>
  );
}