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
const Product = require("./models/product.model");

app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/user",userRouter);

app.get("/",verifyAuth,async (req, res) => {
  const products = await Product.find();
  res.render("home",{products});
});

connectDB().then(()=>{
  app.listen(PORT, () => console.log("Server running on port " + PORT));
}).catch((error)=>console.log(error));

