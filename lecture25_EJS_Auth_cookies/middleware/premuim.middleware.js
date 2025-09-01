const User = require("../models/user.model");

async function goldUserVerify(req,res,next){
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user.package != "gold" && user.package != "platinum"){
      throw new Error("You dan't have a package to accesss this")
    }
    next();
  } catch (error) {
    res.status(400).json({mesage:error.message})
  }
}

async function platinumUserVerify(req,res,next){
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(user.package != "platinum"){
      throw new Error("You dan't have a package to accesss this")
    }
    next();
  } catch (error) {
    res.status(400).json({mesage:error.message})
  }
}

module.exports = {goldUserVerify,platinumUserVerify}