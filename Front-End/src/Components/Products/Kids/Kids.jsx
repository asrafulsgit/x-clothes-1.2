import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './Kids.css'
// import { kids } from '../../../allProductDetails/allProduct'
import OutlateProduct from '../../App/Outlate/OutlateProduct'
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import kidsBanner from '../../../assets/banners/kids-banner.png'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../Authentication/Controllers/UserSlice';

const Kids = () => {
  const dispatch = useDispatch()
  const {message,selectedCategory} =useSelector(state => state.authInfo || 301 )
  const [kidsData,setKidsData]= useState([])
  useEffect(()=>{
    if(selectedCategory.length > 0){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : selectedCategory})
      .then((res)=>{
        setKidsData(res.data.products)
      }).catch((err)=>{
        dispatch(setMessage(err.response.data.message))
        setKidsData([])
      })
    }
    else{
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['301320','401420']})
      .then((res)=>{
        setKidsData(res.data.products)
      }).catch((err)=>{
        dispatch(setMessage(err.response.data.message))
      })
    }
  },[selectedCategory])


  return (
    <div className='kids-page'>
      <Nav />
      <div className="kids-banner">
        <img src={kidsBanner} alt="Kids-banner" />
      </div>
      
      <div className="kids-section">
        <div className='kids-shop'>
            {kidsData.length <= 0 ? <p>{message}</p> 
            : kidsData.map((item)=>{
              return <OutlateProduct key={uuidv4()} item={item}/>
            })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Kids
