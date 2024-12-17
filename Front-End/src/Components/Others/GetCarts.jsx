import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts, setMessage } from '../Authentication/Controllers/UserSlice'

const GetCarts = () => {
     const dispatch = useDispatch()
     const {carts, userInfo} = useSelector(state=> state.authInfo)

    
  return (null)
}

export default GetCarts
