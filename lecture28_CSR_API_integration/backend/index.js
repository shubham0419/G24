const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 4000;
require("dotenv").config();
const cors = require("cors");

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,PATCH,DELETE",
  credentials:true //TO SEND OR RECEIVE COOKIES B/W TWO SERVERS
}))
// routers
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/user",userRouter);
app.get("/", (req, res) => {	});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error));

