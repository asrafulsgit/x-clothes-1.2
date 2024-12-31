const express = require('express');

const userRouter  = express.Router();

const userAuthentication = require('../Middlewares/userAuth-middleware');
const {userRegister, userLogin, userProfile, resetPassword, EmailVerification, findUserAndSendEmail} = require('../Controllers/user.controllers');




userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
// user profile
userRouter.get('/user-profile',userAuthentication, userProfile)


userRouter.post('/forgot-password-email',findUserAndSendEmail)
userRouter.post('/forgot-password-email-verification',EmailVerification)
userRouter.put('/reset-password',resetPassword)



module.exports = userRouter;