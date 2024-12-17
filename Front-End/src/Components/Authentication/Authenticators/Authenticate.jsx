import React, { useEffect } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

const Authenticate = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if(!token){
      localStorage.removeItem('isLoggedIn')
    }
  },[])

  return (isLoggedIn && token ? <Outlet /> : <Navigate to='/login'/>)
}

export default Authenticate
