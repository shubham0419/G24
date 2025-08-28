const express = require("express");
const verifyAuth = require("../middleware/auth.middleware");
const User = require("../models/user.model");
const router = express.Router();

router.post("/package/buy",verifyAuth,async (req,res)=>{
  try {
    const {package} =  req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(package=="gold"){
      user.package = "gold",
      user.credits += 500;
    }else{
      user.package = "platinum",
      user.credits += 1000;
    }
    await user.save();
    res.status(200).json({message:"package bought successfully."})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router;