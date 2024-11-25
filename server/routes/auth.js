const express = require('express');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/constants');
const router = express.Router();

router.post('/signup', async(req, res)=> {
  const {userName, userPassword, role} = req.body;
  const hashedPassword = await bcrypt.hash(userPassword,10);
  const user = new User({userName, userPassword:hashedPassword, role});
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser).json({message:"success"});
  } catch {
    res.status(400).json()
  }
})

router.post('/login', async(req, res)=> {
  const {userName, userPassword} = req.body;
  const user= await User.findOne({userName:userName});
  const confirmed = await bcrypt.compare(userPassword, user.userPassword);
  if(user && confirmed) {
    const token = jwt.sign({id:user._id, role:user.role}, secret, {expiresIn:"1h"});
    req.session.userId=user._id;
    req.session.role = user.role;
    res.json({message:"login successfully!", 
      data:{token, role:user.role}});
  } else {
    res.status(401).json({error:'invalid credentials'});
  }
})

const authenticateJWT = (req, res, next) => {
  const token=req.headers['authorization']?.split('')[1];
  if(!token) return res.status(403);
  jwt.verify(token, secret, (error, user)=> {
    if(error) return res.status(403);
    req.user= user;
    next();
  }) 
}

router.get('/', authenticateJWT, (req, res)=> {
  res.json({message:'welcome!', user:req.user})
});

router.get('/getusers', async(req, res) => {
  const users = await User.find({});
  res.json({users:users});
})

router.post('/logout', (req, res)=> {
  req.session.destroy((err)=> {
    if(err) {
      return res.status(500).json({error:err.message})
    }
    res.json({message:'logout'});
  })
});


module.exports = router;

