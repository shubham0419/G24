const express = require("express");
const client = require("./client");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// strings dtat types
app.get("/", async(req, res) => {
  try {
    const res1 = await client.set("users:11","shiv",'nx');

    const data = await client.get("users:9");

    client.expire("users:2",5)

    res.json({data});
  } catch (error) {
    console.log(error.message);
  }
});

// list data type 

app.get("/list",async (req,res)=>{
  try {
    const res1 = await client.lpush("firstls",1);

    const res2 = await client.rpush("firstls",2);

    const data = await client.lrange("firstls",0,-1);

    res.json({data});
  } catch (error) {
    console.log(error);
  }
})

// sets data type

app.get("/sets",async (req,res)=>{
  try {
    const res1 = await client.sadd("myset",10);
    const res2 = await client.sadd("myset","hello");

    const data = await client.smembers("myset");
    const check = await client.sismember("myset","hello");
    res.json({data,check});
  } catch (error) {
    console.log(err);
  }
})



app.listen(PORT, () => console.log("Server running on port " + PORT));