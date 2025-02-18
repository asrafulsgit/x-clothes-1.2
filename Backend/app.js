const express = require('express');
const http = require('http')
const {initSocket, getIo} = require('./socket')

const cookieParser = require('cookie-parser')
const userRouter = require('./Routers/user.router')
const productRouter = require('./Routers/product.router')
const cors = require('cors');
const { addToCartRoute } = require('./Routers/addToCart.router');
const  {favouriteRoute} = require('./Routers/addToFavourite.router');

const app = express();
const server = http.createServer(app)
const io = initSocket(server)
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
     origin : 'http://localhost:5173',
     credentials : true
}))







app.use(userRouter) 
app.use(productRouter)
app.use(addToCartRoute)
app.use(favouriteRoute)

module.exports = server;

