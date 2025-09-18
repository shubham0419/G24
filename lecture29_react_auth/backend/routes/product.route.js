const express = require("express");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const { goldUserVerify, platinumUserVerify } = require("../middleware/premuim.middleware");
const verifyAuth = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/create",async(req,res)=>{
  const dummyProducts = [
    {
      name:"product 1",
      price:500,
      description:"this is product 1"
    },
    {
      name:"product 2",
      price:500,
      description:"this is product 2"
    },
    {
      name:"product 3",
      price:500,
      description:"this is product 3"
    },
    {
      name:"product 4",
      price:500,
      description:"this is product 4"
    }
  ]
  try {
    const products = await Product.insertMany(dummyProducts);
    res.status(200).json({products});
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

router.get("/gold/discount/:productId",verifyAuth,goldUserVerify,async(req,res)=>{
  try {
    const {productId} = req.params;
    const product = await Product.findById(productId);
    const user = await User.findById(req.user.id);
    // gold discount -> 10%
    if(user.credits - (0.1*product.price) <0){
      throw new Error("You don't have enough credits")
    }
    const discountedPrice = product.price - 0.1*product.price;
    res.status(200).json({discountedPrice})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})
router.get("/platinum/discount/:productId",verifyAuth,platinumUserVerify,async(req,res)=>{
  try {
    const {productId} = req.params;
    const product = await Product.findById(productId);
    const user = await User.findById(req.user.id);
    // PLATINUM discount -> 20%
    if(user.credits - (0.2*product.price) <0){
      throw new Error("You don't have enough credits");
    }
    const discountedPrice = product.price - 0.2*product.price;
    res.status(200).json({discountedPrice})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
})

module.exports = router;