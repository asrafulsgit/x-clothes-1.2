import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import './Men.css'

import OutlateProduct from '../../App/Outlate/OutlateProduct';
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import mensBanner from '../../../assets/banners/mens-banner.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Men = () => {
  
  const {favoritesProductsIds} = useSelector(state => state.authInfo)
  const {category} = useParams();
  const [mensData,setMensData]= useState([])
  const [loading,setLoading] = useState(true)
  
  useEffect(()=>{
    if(category.length === 3){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : category})
      .then((res)=>{
        setMensData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setMensData([])
      })
    }
    if(category === '101120'){
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['101120']})
      .then((res)=>{
        setMensData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
          console.log(err)
      })
    }
  },[category])

  if(loading){
    return <h1>loading....</h1>
  }
   
  return (
    <div className='mens-page'>
    <Nav />
    <div className="mens-banner">
      <img src={mensBanner} alt="Mens-banner" />
    </div>
    <div className="mens-section">
      <div className='mens-shop'>
      {!loading && mensData.length <= 0 && <p>{''}</p>}
      {!loading && mensData.length >= 0 &&  mensData.map((item)=>{
        return <OutlateProduct key={uuidv4()} item={item} favorites={favoritesProductsIds}/>
      })}
      </div>
    </div>
    <Footer />

    
  </div>
  )
}

export default Men
