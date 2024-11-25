const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type:String,
    required:true,
    unique:true
  },
  userPassword: {
    type:String,
    required:true
  },
  role:{
    type:String
  }
});

module.exports = User = mongoose.model('users', UserSchema);

