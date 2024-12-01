const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const dbUrl = require('./config/constants').dbUrl;
const secretKey = require('./config/constants').secret;

const userRouter = require('./routes/auth');
const userManage = require('./routes/admin/user');
const productRouter = require('./routes/admin/productupload');
const clientproduct = require('./routes/client/production');
const app = express();
const port = process.env.PORT||5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret:secretKey,
  resave:false,
  saveUninitialized:true,
  cookie:{secure:false}
}));

mongoose
  .connect(dbUrl)
  .then(()=> {
    console.log('mongodb connect succesfully');
  })
  .catch((error)=>console.log(error));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/api/user', userRouter);
app.use('/api/userManage', userManage);
app.use('/api/product', productRouter);
app.use('/api/client', clientproduct);
app.listen(port, ()=>{
  console.log(`server is running on ${port}`);
});
