const express = require("express");
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require("bcrypt");

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


module.exports = router;