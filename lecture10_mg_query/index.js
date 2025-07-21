const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const connectDB = require("./db/connectDb");
const User = require("./models/user.schema");
const bulkUserUpload = require("./db/seed");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
// routers
const userRouter = require("./routes/user.routes");

app.use("/user",userRouter);

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
})
.catch((error)=>console.log(error))
