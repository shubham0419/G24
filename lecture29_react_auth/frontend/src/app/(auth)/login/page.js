"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  async function handleSubmit(e){
    e.preventDefault();
    const payload = {
      email,
      password
    }
    let res = await axios.post("http://localhost:4000/auth/login",payload)
    if(res.status==200){
      // cookie will expire in seven days
      Cookies.set("token",res.data.token,{expires:7})
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-7">Log In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50"
            />
          </div>
          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="pass"
              placeholder="Password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 bg-blue-50"
            />
          </div>
          <button
            type="submit"
            className="mt-2 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-blue-500 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;