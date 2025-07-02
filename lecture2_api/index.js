const express = require("express");
const app = express();
const PORT = 4000;


app.use(express.json());

app.get("/",(req,res)=>{
  // res.send("server is live");
  const result = {
    name:"nothing",
    work:null
  }
  res.json(result)
})

app.post("/",(req,res)=>{
  console.log(req.body);
  res.send("ok");
})

app.listen(PORT,()=>{
  console.log(`server live on ${PORT}`);
})