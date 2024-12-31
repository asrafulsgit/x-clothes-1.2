const User = require('../Models/user.model')
const Product = require('../Models/products.model');
const Favourite = require('../Models/addToFavourite.model');

const addToFavourite = async(req,res)=>{
     const {userId,productId}= req.body;
     try {
          const userExist = await User.findById(userId)
          const productExist = await Product.findById(productId)
          const fovouriteExist = await Favourite.findOne({$and : [{userId},{productId}]})
          if(!userExist){
               res.status(404).send({message : 'User is not valid!'})
          }else if(!productExist){
               res.status(404).send({message : 'Product is not found!'})
          }else if(fovouriteExist){
               res.status(404).send({message : 'Product is added!'})
          }else{
               const addToFavourite = new Favourite({
                    userId,
                    productId
               });
               await addToFavourite.save()
               res.status(201).send({
                    message : 'Product is added on favourite',
                    produt : addToFavourite
               })
          }               
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}
const getFavouriteProducts =async(req,res)=>{
     const {id}= req.userInfo;
     const userId = id;
     try {
          const userExist = await User.findById(userId)
          if(!userExist){
               res.status(404).send({message : 'User is not valid!'})
          }else{
               const favouriteProducts = await Favourite.find({userId})
               const productIds = favouriteProducts.map(item => item.productId)
               const products = await Product.find({'_id':{$in : productIds}})
               if(!favouriteProducts){
                    res.status(404).send({message : 'Favourite is empty!'})
               }else{
                    res.status(201).send({
                         produts : products
                    })
               } 
          }
                
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}

const removeFavouriteItem =async(req,res)=>{
     const {userId,productId}= req.body;
     try {
          const isFavouriteExist = await Favourite.deleteOne({$and : [{userId},{productId}]})
          if(!isFavouriteExist){
               res.status(404).send({message : 'Product is not found!'})
          }else{
               res.status(200).send({message : 'Favourite item is deleted'})
          }
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})  
     }
}
const isFavouriteWithHover =async(req,res)=>{
     const {userId,productId}= req.body;
     try {
          const isFavouriteExist = await Favourite.findOne({$and : [{userId},{productId}]})
          if(!isFavouriteExist){
               res.status(404).send({
                    message : 'Product is not found!',
                    success : false
               })
          }else{
               res.status(200).send({
                    message : 'Favourite item is found',
                    success : true
               })
          }
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})  
     }
}

module.exports={
     addToFavourite,
     getFavouriteProducts,
     removeFavouriteItem,
     isFavouriteWithHover
}