const mongoose = require("mongoose");

async function connectDB(){
  await mongoose.connect(process.env.DB_URL);
  console.log("db connected");
}

module.exports = connectDB;