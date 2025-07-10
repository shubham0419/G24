const express = require("express");
const { genericMiddleware, pathSpecific, verifyUser } = require("./middleware/practice.middleware");
const app = express();
const PORT = 4000;

//// generic ,middleware
// app.use((req,res,next)=>{
//   console.log("generic middleware 1");
//   next();
// })
app.use(genericMiddleware);

//// path specific middleware
// app.use("/user",(req,res,next)=>{
//   console.log("path specific middleware");
//   next();
// })
app.use("/user",pathSpecific);

// // API's / routes specific middleware
// function verifyUser(req,res,next){
//   console.log("user verified");
//   next();
// } 

app.get("/",verifyUser,(req,res,next)=>{
  console.log("home api");
  res.json({meessage:"server is live"});
  // next(); // this will forward the req to next app.get("/")
})

// app.get("/",(req,res)=>{
//   console.log("home api 2");
//   res.json({meessage:"server is live"});
// })

app.get("/user",(req,res)=>{
  console.log("/user api");
  res.send("user api working");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
})