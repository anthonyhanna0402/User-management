const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

router.post('/edit', async (req, res)=> {
  const userId = await req.body.userId;
  const role = await req.body.role;
  const password = "00000000"
  const editUser = await User.findById(userId);
  const hashedPassword = await bcrypt.hash(password,10);
  editUser.role = role;
  editUser.userPassword = hashedPassword;
  const savedUser = await editUser.save();
  console.log('savedUser', savedUser);
  res.status(200).json({message:'successful'});
});

router.post('/delete', async (req, res) => {
  const userId = await req.body.userId;
  try {
    await User.findByIdAndDelete(userId);

    const updatedUser = await User.find({});

    res.status(200).json({updatedUser});
  } catch (error) {
    console.log(error);
  }
})




module.exports = router;
