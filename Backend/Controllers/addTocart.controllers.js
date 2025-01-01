const addToCartModel = require("../Models/addToCart.model");
const Product = require("../Models/products.model");
const User = require("../Models/user.model");

const addNewCart = async(req,res)=>{
    try {
      const {userId,productId,quantity} = req.body;
      const isUserExist = await User.findById(userId)
 
      if(!isUserExist){
           res.status(404).send({message : 'User is not valid!'})
      }
      const isProductExist = await Product.findById(productId)
      if(!isProductExist){
           res.status(404).send({message : 'Product is not available'})
      }
      
      const isProductAdded = await addToCartModel.findOne({$and : [{userId},{productId}]})
      if(isProductAdded){
           isProductAdded.quantity += 1 
           await isProductAdded.save()
           res.status(200).send({message : 'Product is added'})
      }else if(isUserExist && isProductExist){
           const newCart = new addToCartModel({
                userId,
                productId,
                quantity
           })
           await newCart.save();
           res.status(200).send(newCart)
      }
    } catch (error) {
     res.status(500).send({message : 'somthing broke!'})
    }
}
const getUserCarts = async(req,res)=>{
     try {
          const {id}= req.userInfo;
          const userId = id;
          const isUser = await User.findById(userId)
          if(!isUser){
               res.status(404).send({message : 'User is not found!'})
          }
          const cartProducts = await addToCartModel.find({userId})
          if(!cartProducts || cartProducts.length <= 0){
               res.status(404).send({message : 'You have no cart!'})
          }else{
               const productIds = cartProducts.map((item)=> item.productId)
               const products = await Product.find({'_id' : {$in : productIds}})
               const addingQuantityWithProduct = products.map((product)=>{
                    const machingProductId = cartProducts.find((item => item.productId.toString() === product._id.toString()))
                    if(machingProductId){
                         return{
                              ...product.toObject(),
                              quantity : machingProductId.quantity
                         }
                    }
                    return product
               })
               res.status(200).send({
                    cartProducts : addingQuantityWithProduct
               })
          }
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})    
     }   
}

const removeCartItem = async(req,res)=>{
     try {
          const {userId,productId}= req.body;
          const isCartExist = await addToCartModel.deleteOne({$and : [{userId},{productId}]})
          if(!isCartExist){
               res.status(404).send({message : 'Cart is not found!'})
          }else{
               res.status(200).send({message : 'Cart is deleted'})
          }
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}



module.exports = {
     addNewCart,
     getUserCarts,
     removeCartItem
}