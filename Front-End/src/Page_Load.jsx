import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoggedIn,setCarts,setFavorites,setLoading,setFavoritesProducts } from './Components/Authentication/Controllers/UserSlice'
import axios from 'axios'

const Page_Load = () => {
     const dispatch = useDispatch()
     const {isLoggedIn,loading} = useSelector(state => state.authInfo)
     useEffect(()=>{
          try {
            axios.get('http://localhost:8000/access/token/refresh',{
              withCredentials : true
           }).then((res)=>{
              // console.log(res)
              dispatch(setIsLoggedIn(true))
              dispatch(setLoading(false))
            }).catch((err)=>{
              // console.log(err)
              dispatch(setLoading(false))
            })  
          } catch (error) {
            console.error('the error is', error)
          }          
     },[])
  return (<></>)
}

export default Page_Load
