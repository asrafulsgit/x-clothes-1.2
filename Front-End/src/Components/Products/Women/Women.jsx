import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import './Women.css'
// import { womens } from '../../../allProductDetails/allProduct'
import OutlateProduct from '../../App/Outlate/OutlateProduct';
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import womensBanner from '../../../assets/banners/womens-banner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../Authentication/Controllers/UserSlice';

const Women = () => {
  const dispatch = useDispatch()
  const {message,selectedCategory} =useSelector(state => state.authInfo)
  const [womensData,setWomensData]= useState([])
  useEffect(()=>{
    if(selectedCategory.length > 0){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : selectedCategory})
      .then((res)=>{
        setWomensData(res.data.products)
      }).catch((err)=>{
        dispatch(setMessage(err.response.data.message))
        setWomensData([])
      })
    }else{
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['201230']})
      .then((res)=>{
        setWomensData(res.data.products)
      }).catch((err)=>{
        dispatch(setMessage(err.response.data.message))
      })
    }
  },[selectedCategory])

  return (
    <div className='womens-page'>
      <Nav />
      <div className="womens-banner">
        <img src={womensBanner} alt="womens-banner" />
      </div>
      <div className="womens-section">
          <div className='womens-shop'>
              {womensData.length == 0 ? <p>{message}</p>
               : womensData.map((item)=>{
                return <OutlateProduct key={uuidv4()} item={item}/>
              })}
          </div>
      </div>
      <Footer />
  </div>
  )
}

export default Women
