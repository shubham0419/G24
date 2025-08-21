const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    minLength:6,
    select:false   
    // this field will not be included when server retrieve 
    // user data from DB
  },
  role:{
    type:String,
    // user defined data value
    enum:["user","admin"], // role can only have two values i.e. "user","admin"
    default:"user",
    select:false
  }
},
{
  timestamps:true  // createdAt & updatedAt
})

const User = mongoose.model("User",userSchema);
module.exports = User;