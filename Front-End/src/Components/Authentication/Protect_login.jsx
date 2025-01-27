import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protect_login = () => {
     const [isAuth,setIsAuth]=useState(false)
     const [loading,setLoading]=useState(true)
     useEffect(()=>{
          axios.get('http://localhost:8000/access/token/refresh',{
            withCredentials : true
          }).then((res)=>{
            console.log(res)
            setIsAuth(res.data.isAuth)
            setLoading(false)
          }).catch((err)=>{
            console.log(err)
            setLoading(false)
          })
     },[])
     if(loading){
          return <h1>loading.....</h1>
     }
     return (!loading && isAuth ? <Navigate to='/' /> : <Outlet /> )
}

export default Protect_login
