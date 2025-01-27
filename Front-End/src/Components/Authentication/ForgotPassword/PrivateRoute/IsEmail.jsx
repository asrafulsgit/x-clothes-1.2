import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const IsEmailExist = () => {
  
  return (
    isEmail ? <Outlet /> : <Navigate to='/login' />
  )
}

export default IsEmailExist
