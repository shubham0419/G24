const express = require("express");
const User = require("../models/user.model");
const router = express.Router();

router.post("/signup",async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
      throw new Error("All fields are required")
    }
    const user = await User.create({
      name:name,
      email:email,
      // password
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})


module.exports = router;