const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name:String,
  name:{
    type:String,
    required:true,   // makes an attribute compulsory
    minLength:3,      // name can't be less than 3 char
    trim:true        // remove white spaces
  },
  email:{
    type:String,
    required:true,
    unique:true      // an email can be used only one time
  },
  age:{
    type:Number,
    min:1,           // minimum value of age possible
    max:124          // maximum value of age possible
  },
  DOB:{
    type:Date,
  }
});

const User = mongoose.model("User",userSchema);
module.exports = User;