const express = require('express');

const userRouter = require('./Routers/user.router')
const productRouter = require('./Routers/product.router')
const cors = require('cors');
const { addToCartRoute } = require('./Routers/addToCart.router');

const app = express();

app.use(cors())
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(userRouter)
app.use(productRouter)
app.use(addToCartRoute)

module.exports = app;

