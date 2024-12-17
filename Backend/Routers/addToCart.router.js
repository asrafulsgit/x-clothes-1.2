const express = require('express');

const { addNewCart, getUserCarts, removeCartItem } = require('../Controllers/addTocart.controllers');
const addToCartRoute = express.Router()


addToCartRoute.post('/add-to-cart', addNewCart)

addToCartRoute.post('/get-user-carts', getUserCarts)

addToCartRoute.delete('/remove-cart-item', removeCartItem)

module.exports = {
     addToCartRoute
}
