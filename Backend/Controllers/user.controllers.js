const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const User = require('../Models/user.model')


const userRegister = async(req,res)=>{
     try {
          const {name,email,password}= req.body;
          const isExist = await User.findOne({email});
          if(isExist){
               res.status(400).send({
                    message : 'email is already exist!',
                    field : 'email'
               })
          }else if(password.length < 6){
               res.status(400).send({
                    message : 'Password must be 6 digit!',
                    field : 'password'
               })
          }else{
               const hash = await bcrypt.hash(password, 10);
               const newUser = new User({
                    name,
                    email,
                    password : hash
               })
               await newUser.save();
               res.status(201).send({message : 'Register completed'})
          } 
     } catch (error) {
          res.status(500).send({
               message : 'somthing broke!',
               field : 'server'
          })
     } 
}
const userLogin = async(req,res)=>{
     const {email,password} = req.body; 
     try {
          const isExist = await User.findOne({email});
          if(!isExist){
               return res.status(404).send({ 
                    message : 'email is not valid!',
                    field : 'email'
               })
          }
           
          if(password.length < 6){
                return res.status(404).send({
                         message : 'Password must be 6 digit!',
                         field : 'password'
                    })
          }
          const existedUser = await bcrypt.compare(password, isExist.password );
          if(!existedUser){
               return  res.status(404).send({
                         message : 'wrong password!',
                         field : 'password'
                    })
          }
               const accessToken = jwt.sign({
                    id : isExist._id
               },process.env.JWT_ACCESS_TOEKN,{expiresIn : '15m'})

               const refreshToken = jwt.sign({
                    id : isExist._id
               },process.env.JWT_REFRESH_TOKEN,{expiresIn : '7d'})
               
               isExist.refreshtoken = refreshToken
               await isExist.save()

               res.cookie('accesstoken',accessToken,{
                    httpOnly : true,
                    secure: false,   
                    sameSite: 'Strict',
                    maxAge : 1000*60*15
               })
               res.cookie('refreshtoken',refreshToken,{
                    maxAge: 1000*60*60*24*7,
                    httpOnly : true,
                    secure: false,   
                    sameSite: 'Strict',
               })

               return res.status(200).send({
                    message : 'logged in success',
                    success : true
               })  
     } catch (error) {
          return res.status(500).send({
               message : 'somthing broke!',
               field : 'server',
               success: false
          })
     }  
}

const tokenRefresh =async(req,res)=>{
     const {accesstoken,refreshtoken} = req.cookies;
     try {
          if(accesstoken){
               return res.status(200).send({
                    message : 'authorized user',
                    isAuth : true
               })
          }
          if(!accesstoken && refreshtoken){
               try {
                    const decodeRefreshToken = jwt.verify(refreshtoken,process.env.JWT_REFRESH_TOKEN)
                    const user = await User.findById(decodeRefreshToken.id);
                    if(!user || user.refreshtoken !== refreshtoken){
                         return res.status(401).send({
                              message : 'unauthorized user',
                              isAuth : false
                         })
                    }
                    const newAccessToken = jwt.sign({
                         id : user._id
                    },process.env.JWT_ACCESS_TOEKN,{expiresIn : '15m'})

                    res.cookie('accesstoken',newAccessToken,{
                         httpOnly : true,
                         secure: false,   
                         sameSite: 'Strict',
                         maxAge : 1000*60*15
                    })
                    return res.status(200).send({
                         message :'authorized user',
                         isAuth : true
                    })
               } catch (error) {
                    return res.status(404).send({
                         message : 'refresh token is not found',
                         isAuth : false
                    })
               }
          }
          return res.status(404).send({
               message : 'token is not found',
               isAuth : false
          })
     } catch (error) {
          return res.status(500).send({
               message : 'something broke!',
               isAuth : false
          })
     }
}

const userProfile = async (req,res)=>{
     try {
          const userInfo = req.userInfo;
          res.status(200).send(userInfo) 
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }     
}

// forgot-password
const findUserAndSendEmail =async(req,res)=>{
     try {
          const {email} = req.body;
          const user = await User.findOne({email})
          if(!user){
               res.status(404).send({ message : 'email is not found!'})
          }else{    
               const createVerificationCode = Math.floor((Math.random()+1)*100000)
               
               user.resetpasswordcode = createVerificationCode;
               user.resetpasswordexpiries = Date.now() + 60000  // 1min
               await user.save();

               // send mail
               const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    secure : true,
                    host : 'smtp.gmail.com',
                    port : 465,
                    auth: {
                      user: 'sourob2356@gmail.com',
                      pass: 'hgwoowqncjmmpdkr'
                    }
                  });
                  
                  const mailOptions = {
                    from: 'sourob2356@gmail.com',
                    to: email,
                    subject: 'Reset password',
                    text: `your reset password code is ${createVerificationCode}`
                  };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                         console.log(error);
                    } else {
                         res.status(200).send({
                              message : 'Verification code is sent'
                         })
                    }
                  });
              
          }
          
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}
const EmailVerification =async(req,res)=>{
     try {
          const {email, code} = req.body;
          
          const user = await User.findOne({email})
          if(!user){
               res.status(404).send({ message : 'email is not found!'})
          }else if(Date.now() > user.resetpasswordexpiries){
               res.status(404).send({ message : "this code is expired!"})
          }else if(user.resetpasswordcode === code){  
               res.status(200).send({ message : "verification is complited"})     
          }else{
               res.status(404).send({ message : "Code is not match!"})   
          }    
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}
const resetPassword =async(req,res)=>{
     try {
          const {email,password} = req.body;
          const user = await User.findOne({email})
          if(!user){
               res.status(404).send({ message : 'email is not found!'})
          }else{  
               const hashedPassword = await bcrypt.hash(password, 10);
               user.password = hashedPassword;
               user.resetpasswordcode = undefined;
               user.resetpasswordexpiries = undefined;
               await user.save();
               res.status(200).send({ message : 'password is successfully reset'})
          } 
     } catch (error) {
          res.status(500).send({message : 'somthing broke!'})
     }
}

module.exports={
     userRegister,
     userLogin,
     userProfile,
     findUserAndSendEmail,
     EmailVerification,
     resetPassword,
     tokenRefresh
}