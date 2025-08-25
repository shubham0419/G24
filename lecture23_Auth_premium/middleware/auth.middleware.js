const jwt = require("jsonwebtoken")

async function verifyAuth(req,res,next){
  try {
    const authorization = req.headers.authorization;
    const token  = authorization.split(" ")[1];
    const payload = jwt.verify(token,process.env.JWT_SECRET);
    //jwt.verify will create an error if invalid token
    req.user = payload;
    // added a key "user" in req object
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({message:"you are not authorized, please login first"})
  }
}

module.exports = verifyAuth;