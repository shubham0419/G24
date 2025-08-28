const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 4000;
require("dotenv").config();
const path = require("path");
const cookieParser= require("cookie-parser");
// routers
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const verifyAuth = require("./middleware/auth.middleware");

app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/user",userRouter);

app.get("/",verifyAuth, (req, res) => {
  const name = "shubham";
  const contacts = [{name:"user 1",contact:9328748723},{name:"contact 2 1",contact:7341748724}]
  res.render("home",{name:name,myContacts:contacts});
});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error));

