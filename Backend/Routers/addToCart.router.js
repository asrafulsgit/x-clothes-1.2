const express = require('express');

const userAuthentication = require('../Middlewares/userAuth-middleware')
const { addNewCart, getUserCarts, removeCartItem } = require('../Controllers/addTocart.controllers');
const addToCartRoute = express.Router()


addToCartRoute.post('/add-to-cart', addNewCart)

addToCartRoute.get('/get-user-carts',userAuthentication, getUserCarts)

addToCartRoute.delete('/remove-cart-item', removeCartItem)

module.exports = {
     addToCartRoute
}
