const User = require("../models/user.schema");

const duumyUsers = [
  {
    name:"user 1",
    email:"user1@gmail.com",
    age:18,
    DOB:new Date("07/17/2007")
  },
  {
    name:"user 2",
    email:"user2@gmail.com",
    age:19,
    DOB:new Date("07/17/2006")
  },
  {
    name:"user 3",
    email:"user3@gmail.com",
    age:19,
    DOB:new Date("03/17/2006")
  },
]

async function bulkUserUpload(){
  try {
    let users = await User.insertMany(duumyUsers);
    console.log("users uploades to DB");
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);     // this will forward error or return a error 
  }
}

module.exports = bulkUserUpload;