const jwt = require('jsonwebtoken');

const userAuthentication = async(req,res,next)=>{
     const {accesstoken} =req.cookies;
     try {
          if(!accesstoken){
               res.send('token is not found')
          }else{
               const verifytoken = jwt.verify(accesstoken, process.env.JWT_SECRET_KEY)
               req.userInfo = verifytoken;
               next();
          }
     } catch (error) {
          res.status(500).send({
               message : 'somthing broke!',
               success : false
          })
     }
}

module.exports = userAuthentication ;

