import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const IsEmailExist = () => {
  const {isEmail} = useSelector((state)=> state.authInfo)
  return (
    isEmail ? <Outlet /> : <Navigate to='/login' />
  )
}

export default IsEmailExist
