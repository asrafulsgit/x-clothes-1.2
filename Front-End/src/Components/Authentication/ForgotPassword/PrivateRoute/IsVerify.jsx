import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const IsVerified = () => {
  const {isVerify} = useSelector((state)=> state.authInfo)
  return (
    isVerify ? <Outlet /> : <Navigate to='/login'/>
  )
}

export default IsVerified
