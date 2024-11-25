const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number
  },
  image:{
    type:String
  }
});

module.exports = Product = mongoose.model('products', ProductSchema);