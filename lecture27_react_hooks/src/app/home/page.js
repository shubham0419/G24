"use client"

import { useState } from "react"

const Page = ()=>{
  // let count = 0;

  // function IncrimentCount(){
  //   count++;
  //   console.log(count);
  // }

  const [count,setCount] = useState(0);

  function IncrimentCount(){
    setCount(count+1);
  }

  return <div>
    <h1 className="text-5xl">this is home Page</h1>
    <h2 className="text-5xl text-center">{count}</h2>
    <button onClick={(e)=>{IncrimentCount()}}>Incriment</button>
  </div>
}

export default Page;