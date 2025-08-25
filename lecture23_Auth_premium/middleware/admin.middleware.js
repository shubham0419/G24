const User = require("../models/user.model");

async function verifyAdmin(req,res,next){
  try {
    const currUserId = req.user.id;
    const currUser = await User.findById(currUserId).select('+role');
    // select('+role) -> will retrieve role field too from DB.
    if(currUser.role != "admin"){
      throw new Error("You don't have access")
    }
    next();
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

module.exports = verifyAdmin;