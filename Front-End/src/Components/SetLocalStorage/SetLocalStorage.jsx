import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { setCarts, setMessage, setUserInfo } from '../Authentication/Controllers/UserSlice';
import { useDispatch, useSelector} from 'react-redux';

const SetLocalStorage = () => {
     const dispatch = useDispatch()

     useEffect(()=>{
          // setting token and userinfo
          const token = localStorage.getItem('token');
          if(token){
            localStorage.setItem('isLoggedIn',true)
          }else{
            localStorage.removeItem('isLoggedIn')
          } 
          axios.get('http://localhost:8000/user-profile',{headers : {
              'authorization' : localStorage.getItem('token')
          }}).then((res)=>{
              dispatch(setUserInfo(res.data)) 
          }).catch((err)=> {
              localStorage.removeItem('token')
          })    
     },[])
     
  return (<Outlet />)
}

export default SetLocalStorage;