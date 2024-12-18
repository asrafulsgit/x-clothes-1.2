const express = require('express');
const favouriteRoute = express.Router()

const {addToFavourite, getFavouriteProducts,removeFavouriteItem,isFavouriteWithHover}=require('../Controllers/addTofavourite.controllers')

favouriteRoute.post('/add-to-favourite',addToFavourite)
favouriteRoute.post('/get-to-favourite',getFavouriteProducts)
favouriteRoute.delete('/remove-from-favourite',removeFavouriteItem)
favouriteRoute.post('/check-from-favourite',isFavouriteWithHover)


module.exports= {favouriteRoute};