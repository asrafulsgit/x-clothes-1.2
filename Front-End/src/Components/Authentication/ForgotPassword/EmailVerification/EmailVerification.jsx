import React, { useState } from 'react'
import axios from 'axios'
import './EmailVerification.css'

import { useDispatch, useSelector } from 'react-redux'
import {isVerify } from '../../Controllers/UserSlice'
import { useNavigate } from 'react-router-dom'

const EmailVerification = () => {
     const {setEmail} = useSelector((state)=> state.authInfo)
     const dispatch = useDispatch()
     const navigate = useNavigate()

     const [message,setMessage] = useState('')
     const [isloading,setIsLoading]= useState(false)

     const [verificationInfo, setVerificationInfo]= useState({email:'',code : 0})
     const handleChange =(e)=>{
          const {value} =e.target;
          setVerificationInfo({email : setEmail,code: value})
          setMessage('')
     }

     const handleSubmit=(e)=>{
          e.preventDefault()
          if(verificationInfo.code.length === 6){
               axios.post('http://localhost:8000/forgot-password-email-verification',verificationInfo)
               .then((res)=>{
                    dispatch(isVerify(true))
                    navigate('/reset-password')
               }).catch((err)=>{
                    setMessage(err.response.data.message)
               })
          }else{
               setMessage('Verification Code Must be 6 Digit!')
          }
     }
     const handleResend =()=>{
          setIsLoading(true)
          axios.post('http://localhost:8000/forgot-password-email',{email : setEmail})
          .then((res)=>{
               setIsLoading(false)
               setMessage(res.data.message)
          }).catch((err)=>{
               setMessage(err.response.data.message)
          })
     }
     
     
  return (
    <div>
          <div className='email-verification-section'>
           <p>Check Your {setEmail} email and enter verification Code with in 
               {}s </p>
               <form onSubmit={handleSubmit}>
                    <div className='email-verficaton-code'>
                         <label htmlFor="number">Verificaton</label>
                         <input type="number" name="code" 
                         id="number" onChange={handleChange} required/>
                         <p className='message'>{message}</p>
                    </div>
                    <div className='email-verification-btns'>
                         <button type='button' onClick={handleResend}  className='email-verficaton-resend-btn'>{isloading ? 'Sending...' : 'Re-send'}</button>
                         <button type='submit' className='email-verficaton-btn'>Forgot Password</button>
                    </div>
               </form>
          </div>
    </div>
  )
}

export default EmailVerification
