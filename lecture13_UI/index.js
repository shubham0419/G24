const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

app.get("/", (req, res) => {});

app.get("/user",(req,res)=>{
  let user = {
    name:"user 1",
    age:21,
    branch:"CSE",
  }
  res.status(200).json({user});
})

app.get("/contact",(req,res)=>{
  res.redirect("contact.html");
})

app.listen(PORT, () => console.log("Server running on port " + PORT));