const express = require("express");
const prisma = require("../prisma/client");
const router = express.Router();

router.post("/create",async (req,res)=>{
  try {
    const {name,email} = req.body;
    const user = await prisma.user.create({
      data:{name,email}
    })
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

router.post("/transfer",async (req,res)=>{
  try {
    const {amount,senderId,recieverId} = req.body;
    const transaction = await prisma.$transaction(async (tx)=>{
      const sender = await tx.user.findUnique({
        where:{id:senderId}
      })
      // step 1 - > balance check
      if(!sender || sender.balance < amount){
        throw new Error("insufficient balance")
      }
      // step 2 -> deduct amount from user balance
      await tx.user.update({
        where:{id:senderId},
        // data:{balance:user.balance - amount}
        data:{balance:{decrement:amount}}
      })

      // step 3 -> check reciever and credit amount
      await tx.user.update({
        where:{id:recieverId},
        data:{balance:{increment:amount}}
      })

      // step 4 -> transaction record
      const record = await tx.transaction.create({
        data:{
          amount,
          senderId,
          recieverId
        }
      })
      
      return record;
    })
    res.status(203).json({transaction});
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

// filters query
router.get("/all/filter",async(req,res)=>{
  try {
    // const users = await prisma.user.findMany({
    //   where:{
    //     // // gets all the users whose name starts with "sh"
    //     name:{startsWith:"sh"}
        
    //   }
    // })
    // const users = await prisma.user.findMany({
    //   where:{
    //     // // gets all the users whose name starts with "sh"
    //     name:{endsWith:"sh"}
        
    //   }
    // })

    // const users = await prisma.user.findMany({
    //   where:{
    //     // // gets all the users whose name have with "bh"
    //     name:{contains:"bh",mode:"insensitive"},
    //   },
    //   // to include relation data in user data
    //   include:{
    //     sentTrns:true,
    //     recieveTrns:true
    //   }
    // })

    // const users = await prisma.user.findMany({
    //   where:{
    //     balance:{gte:2000}
    //   }
    // })

    // to get use who have't sent any money
    // const users = await prisma.user.findMany({
    //   where:{
    //     sentTrns:{
    //       none:{}
    //     }
    //   }
    // })

    // to get use who have sent some money
    // const users = await prisma.user.findMany({
    //   where:{
    //     sentTrns:{
    //       some:{}
    //     }
    //   }
    // })

    // sorting
    const users = await prisma.user.findMany({
      orderBy:{createdAt:"desc"}
    })
    res.status(200).json({users})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;