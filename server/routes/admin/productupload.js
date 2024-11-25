const express = require('express');
const router = express.Router();
const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require('path');
let Product = require('../../models/Product');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload');
  },
  filename:function(req, file, cb) {
    cb(null, uuidv4()+'-'+Date.now()+path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

router.post('/upload', upload.single('image'), (req, res)=> {
  console.log('upload file', req.file);

  const newProduct = new Product({
    name:req.body.name,
    price:req.body.price,
    quantity:req.body.quantity,
    image:req.file.path
  });

  newProduct.save()
    .then(()=>res.status(201).json({message:'product added successfully!'}))
    .catch(error=> res.status(400).json({error:error.message}));
});

module.exports = router;