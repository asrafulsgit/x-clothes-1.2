
const jwt = require('jsonwebtoken');

const userAuthentication =async(req,res,next)=>{
     try {
          const token = await req.headers['authorization'];
          if(!token){
               res.send('token is not found')
          }else{
               const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY)
               req.userInfo = verifytoken;
               next();
          }
     } catch (error) {
          res.status(500).send('somthing broke!')
     }
}

module.exports = userAuthentication ;

