const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {userId,courseId} = req.body;
    const courseEnrollement = await prisma.enrollemnet.create({
      data:{userId,courseId}
    })
    res.status(200).json({courseEnrollement})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;