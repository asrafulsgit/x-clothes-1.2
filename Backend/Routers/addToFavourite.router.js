const express = require('express');
const favouriteRoute = express.Router()
const userAuthentication = require('../Middlewares/userAuth-middleware')
const {addToFavourite, getFavouriteProducts,removeFavouriteItem,isFavouriteWithHover}=require('../Controllers/addTofavourite.controllers')

favouriteRoute.post('/add-to-favourite',addToFavourite)
favouriteRoute.get('/get-to-favourite',userAuthentication,getFavouriteProducts)
favouriteRoute.delete('/remove-from-favourite',removeFavouriteItem)
favouriteRoute.post('/check-from-favourite',isFavouriteWithHover)


module.exports= {favouriteRoute};