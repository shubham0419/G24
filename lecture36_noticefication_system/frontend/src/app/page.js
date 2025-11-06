"use client"
import { IconHeart, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import {io} from "socket.io-client"

export default function Home() {
  const [socket,setSocket] = useState(null);
  const [isLoggenIn,setIsLoggedIn] = useState(false);
  const [username,setUsername] = useState("");
  const [content,setContent] = useState("");
  const [posts,setPosts] = useState([]);
  const [refrest,setRefresh] = useState(0);
  const [notice,setNotice] = useState([]);

  // socket client initialise
  useEffect(()=>{
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
  },[])

  const gettAllPosts = async ()=>{
    if(isLoggenIn){
      let res = await axios.get("http://localhost:4000/post/all");
      setPosts(res.data.posts)
    }
  }

  useEffect(()=>{
    gettAllPosts();
  },[refrest])

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

  useEffect(()=>{
    socket?.on("noticefication",(data)=>{
      console.log("object");
      setNotice((prev)=>{
        return [data,...prev];   // ...prev =>copying prev values of array into new array "[...prev]"
      })
    })
  },[])

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

  const handlePostLike = async (id)=>{
    let res = await axios.post(`http://localhost:4000/post/like/${id}/${username}`);
    if(res.status=200){
      setRefresh(prev=>prev+1);
    }
  }

  return (
    <div className="min-h-screen w-full bg-white text-black px-20 py-10">
      <h1 className="text-2xl font-semibold">Hello {username}!!</h1>

      {notice.map((not)=>{
        return <div className="absolute top-10 right-5 border shadow-lg p-5 bg-green-300">
          {not}
        </div>
      })}

      <form onSubmit={handlePostCreate} className="flex flex-col gap-2 border rounded-md p-5">
          <label form="username">Create Tweet</label>
          <textarea rows={3} cols={7} onChange={(e)=>setContent(e.target.value)} className="border" id="username" placeholder="Enter Name"/>
          <button className="border bg-blue-300 rounded-lg">Post</button>
      </form>

      <div className="flex flex-col gap-2 p-5">
        {posts.map((post,indx)=>{
          return <div key={indx} className="border p-4 shadow-md rounded flex flex-col gap-2">
              <div className="flex gap-2">
                <IconUser className="h-7 w-7 rounded-full border"/>
                <h4 className="font-semibold">{post.author}</h4>
              </div>
              <h2 className="text-lg font-semibold capitalize">{post.content}</h2>
              <p className="text-xs text-gray-300 text-right">{new Date(post.createdAt).toLocaleDateString()}</p>
              <div onClick={()=>handlePostLike(post.id)} className="flex gap-2">
              {post.likes.includes(username)?<IconHeart fill="red"/>:<IconHeart/>}
                {post.likes.length} Likes
              </div>
          </div>
        })}
      </div>
      
    </div>
  );
}