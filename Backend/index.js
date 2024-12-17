const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = require('./app')





const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_DB_URL)
.then((res)=>{
     app.listen(PORT, ()=>{console.log('server is running....',PORT)})
     console.log('db is connected')
}).catch((err)=> console.log('db is not connect', err))
