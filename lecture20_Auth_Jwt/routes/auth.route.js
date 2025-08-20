const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pluralize } = require("mongoose");

router.post("/signup",async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required")
    }
    const hashPass = await bcrypt.hash(password,10)

    const user = await User.create({
      name:name,
      email:email,
      password:hashPass
    })
    res.status(201).json({user,message:"user created successfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.post("/login",async(req,res)=>{
  try {
    const {email,password} = req.body;
    if(!email || !password){
      throw new Error("all fields are required");
    }
    const user = await User.findOne({email:email}).select("+password");
    if(!user){
      throw new Error("Invalid email or password");
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,
      {expiresIn:'1h',algorithm:'HS256'}
    );
    res.status(200).json({message:"You are loggedin",token:token})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

router.get("/check",async (req,res)=>{
  try {
    const authorization = req.headers.authorization;
    const token  = authorization.split(" ")[1];
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    // res.send("hello");
    res.status(200).json({user:payload});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;