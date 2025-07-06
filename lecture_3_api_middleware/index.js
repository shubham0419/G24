const express = require("express");
const app = express();
const PORT = 4000;

app.use((req,res,next)=>{
  console.log("generic middleware");
  next();
})

// app.get("/user/:id/:payment_id",(req,res)=>{
//   // console.log(req.params); // {id:"192843618",payment_id:"182753"}
//   const {id,payment_id} = req.params;
//   console.log(payment_id);
//   res.status(200).send("ok ok");
// })

// this middleware will not run as req is stuck in qpp.get("/user/:id/:payment_id")
app.use((req,res,next)=>{
  console.log("generic middleware 2");
  next();
})

app.get("/user",(req,res)=>{
  // console.log(req.query);
  // console.log(req.query.name);
  const {name} = req.query;
  console.log(name);
  res.status(200).send("ok");
})

app.get("/user/:id",(req,res)=>{
  // console.log(req.params); // // {id:"192843618"}
  const {id} = req.params;
  console.log(id);
  res.status(200).send("ok");
})

// app.get("/user/:id/:payment_id",(req,res)=>{
//   // console.log(req.params); // {id:"192843618",payment_id:"182753"}
//   const {id,payment_id} = req.params;
//   console.log(payment_id);
//   res.status(200).send("ok ok");
// })

app.listen(PORT,()=>{
  console.log(`server is live on ${PORT}`);
})

