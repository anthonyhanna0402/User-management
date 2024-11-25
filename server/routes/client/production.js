const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req, res)=> {
  try {
    const product = await Product.find({})

    if(product) {
      return res.status(200).json({product});    
    } 
    return res.status(400).json({message:"eeeeee"}); 
  } catch (error) {
    return res.status(500).json({message:error.message});
  } 
});

module.exports = router;