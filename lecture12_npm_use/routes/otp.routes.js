const express = require("express");
const router = express.Router();
const {otpGenerator,otpVerify} = require("@shubhamo7/otp-handler");

router.get("/generate",async(req,res)=>{
  try {
    let otp = otpGenerator(6);
    res.status(200).json({otp});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.post("/verify",(req,res)=>{
  try {
    const {otp} = req.body;
    const isMatched = otpVerify(otp);
    if(isMatched){
      return res.status(200).json({message:"otp verified"})
    }
    throw new Error({message:"otp not matched"}); // to generate error by self
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

module.exports = router;