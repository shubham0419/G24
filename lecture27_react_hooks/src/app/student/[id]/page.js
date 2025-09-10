"use client"
import { useParams } from 'next/navigation'
import React from 'react'

const Page = ()=>{

  const params = useParams();
  const {id} = params;

  return (
    <div>hello {id}</div>
  )
}

// SSR
// const Page = ({params}) => {

//   const {id} = params;

//   return (
//     <div>hello {id}</div>
//   )
// }

export default Page