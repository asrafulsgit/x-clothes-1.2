import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './BestSellers.css'
import OutlateProduct from '../OutlateProduct'


const BestSellers = () => {
     const [message, setMessage]= useState('')
     const [bestSellers,setBestSellers]= useState([])
     useEffect(()=>{
          axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['120130','230240','330340','420440']})
          .then((res)=>{
               const products = res.data.products.slice(0,6)
               setBestSellers(products)
          }).catch((err)=>{
               dispatch(setMessage(err.response.data.message))
          })
     },[])
     return (
     <>
     <div className="best-seller-page">
          <div className="out-late-item-header">
               <div className="out-late-item-header-title">
                    <h1>Best Sellers</h1>
               </div>
               <div className="out-late-item-header-sub-title">
                    <p>"Customer Favorites"</p>
               </div>
          </div>
          <div className='out-late-item'>
               {bestSellers.length <=0 ? <p>{message}</p> :
               bestSellers.map((item)=>{
               return <OutlateProduct key={uuidv4()} item={item} />
               })}
          </div>   
     </div>
     </> 
  )
}

export default BestSellers
