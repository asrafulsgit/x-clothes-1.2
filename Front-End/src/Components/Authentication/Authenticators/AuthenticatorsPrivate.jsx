import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthenticatorsPrivate = () => {

  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (isLoggedIn ? <Navigate to="/" /> : <Outlet />)
}

export default AuthenticatorsPrivate
