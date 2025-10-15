const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {comment,userId,postId} = req.body;
    const userComment = await prisma.comment.create({
      data:{comment,postId,authorId:userId}
    })
    res.status(200).json({userComment})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;