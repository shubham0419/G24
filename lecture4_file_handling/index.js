const {formatDate, dateConvrter} = require("./helper/date-converter")

let date = formatDate(new Date());
console.log(date);

let localDate = dateConvrter(new Date());
console.log(localDate);

const fs = require("fs");

// async approach
// console.log("1");
// fs.writeFile("./text.txt","hello world !!",(err)=>{
//   console.log(err);
//   console.log("done");
// })

// console.log(2);

// console.log(1);
// const result = fs.writeFileSync("./text2.txt","hello warld !!!");
// console.log(result);
// console.log(2);

console.log(1);

fs.readFile("./text.txt","utf-8",(err,data)=>{
  console.log("Async",data);
})
console.log(2);

const data = fs.readFileSync("./text.txt","utf-8");
console.log("sync",data);

// to update file
fs.appendFile("./text.txt","\n hello again",(err)=>{
  console.log("Async ","done");
})

fs.appendFileSync("./text.txt","\n this is pushed by sync");

// to delte file
fs.unlink("./text.txt",(err)=>{
  console.log(err);
  console.log("file deleted");
});