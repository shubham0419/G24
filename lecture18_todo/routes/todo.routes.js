const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();

router.get("/all",async(req,res)=>{
  try {
    let todos = await Todo.find();
    res.status(200).json({todos})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.post("/create",async (req,res)=>{
  try {
    const {task} = req.body;
    let todo = await Todo.create({
      task:task
    })
    res.status(200).json({todo});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

router.delete("/delete/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({message:"todo deleted successfully"})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.put("/update/:id",async(req,res)=>{
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    todo.status = !todo.status;
    await todo.save();
    res.status(200).json({message:"Todo updated successfuly"})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

router.get("/filter",async (req,res)=>{
  try {
    const {filterName} = req.query;
    if(!filterName){
      throw new Error("filter name is required");
    }
    if(filterName=="all"){
      const todos = await Todo.find();
      return res.status(200).json({todos});
    }
    const todos = await Todo.find({status:(filterName=="active"?false:true)});
    return res.status(200).json({todos});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

module.exports = router;