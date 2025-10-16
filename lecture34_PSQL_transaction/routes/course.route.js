const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {name,description} = req.body;
    const course = await prisma.course.create({
      data:{name,description}
    })
    res.status(201).json({course});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;