import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import './Men.css'

import OutlateProduct from '../../App/Outlate/OutlateProduct';
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import mensBanner from '../../../assets/banners/mens-banner.jpg'
import { useDispatch, useSelector } from 'react-redux';

const Men = () => {
  const dispatch = useDispatch()
  const {selectedCategory} =useSelector(state => state.authInfo)
  const [mensData,setMensData]= useState([])

  useEffect(()=>{
    if(selectedCategory.length > 0){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : selectedCategory})
      .then((res)=>{
        setMensData(res.data.products)
      }).catch((err)=>{
        console.log(err)
        setMensData([])
      })
    }else{
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['101120']})
      .then((res)=>{
        setMensData(res.data.products)
      }).catch((err)=>{
          console.log(err)
      })
    }
  },[])

  return (
    <div className='mens-page'>
    <Nav />
    <div className="mens-banner">
      <img src={mensBanner} alt="Mens-banner" />
    </div>
    <div className="mens-section">
      <div className='mens-shop'>
          {mensData.length <= 0 ? <p>{''}</p> 
          : mensData.map((item)=>{
            return <OutlateProduct key={uuidv4()} item={item}/>
          })}
      </div>
    </div>
    <Footer />
    
  </div>
  )
}

export default Men
