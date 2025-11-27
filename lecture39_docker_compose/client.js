const redis = require("ioredis");

const client = new redis({
  host:process.env.REDIS_HOST || "localhost",
  post:process.env.REDIS_PORT || 6379
});

client.on("connect",()=>{
  console.log("redis client connected");
})

module.exports = client;