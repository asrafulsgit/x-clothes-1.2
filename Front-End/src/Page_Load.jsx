import axios from 'axios'
import React, { useEffect } from 'react'

const Page_Load = ({checkUserCreadentials}) => {
     const setCreadentials=(value)=>{
          checkUserCreadentials(value)
     }
     useEffect(()=>{
          try {
               axios.get('http://localhost:8000/access/token/refresh',{
                 withCredentials : true
              }).then((res)=>{
               //   console.log(res)
               setCreadentials(true)
               }).catch((err)=>{
                    console.log(err)
                    setCreadentials(false)
               })  
             } catch (error) {
               console.error('the error is', error)
             }
     },[])
  return (<></>)
}

export default Page_Load

