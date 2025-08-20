const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 4000;
require("dotenv").config();
// routers
const authRouter = require("./routes/auth.route")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.get("/", (req, res) => {	});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error));

