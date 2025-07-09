function verifyUser(req,res,next){
  console.log("user verified");
  next();
} 

const pathSpecific = (req,res,next)=>{
  console.log("path specific middleware");
  next();
}

const genericMiddleware = (req,res,next)=>{
  console.log("generic middleware 1");
  next();
}

module.exports = {verifyUser,pathSpecific,genericMiddleware}