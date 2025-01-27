const express = require('express')
const dotenv = require('dotenv').config();
const mongoConnection = require('./config/mongoConnect')


const app = require('./app')

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
     console.log('server is running....',PORT)
})
    