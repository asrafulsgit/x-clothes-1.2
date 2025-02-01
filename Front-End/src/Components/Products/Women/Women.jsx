import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

import './Women.css'
// import { womens } from '../../../allProductDetails/allProduct'
import OutlateProduct from '../../App/Outlate/OutlateProduct';
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import womensBanner from '../../../assets/banners/womens-banner.webp'
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const Women = () => {

  const {category}= useParams()
  const [loading,setLoading] = useState(true)
  const [favorites,setFavorites]=useState([])
  const [womensData,setWomensData]= useState([])
  
  useEffect(()=>{
    if(category.length === 3){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : category})
      .then((res)=>{
        setWomensData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setWomensData([])
      })
    }
    if(category === '201230'){
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['201230']})
      .then((res)=>{
        setWomensData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
         console.log(err)
      })
    }
    axios.get('http://localhost:8000/get-to-favourite',{
      withCredentials:true
    }).then((res)=>{
          // console.log(res.data)
          const favorite = res.data.products;
          favorite.map(item => setFavorites((prev)=> [...prev,item._id]))
    }).catch((err)=>{
          console.log(err)
    })
  },[category])

  if(loading){
    return <h1>loading....</h1>
  }
  return (
    <div className='womens-page'>
      <Nav />
      <div className="womens-banner">
        <img src={womensBanner} alt="womens-banner" />
      </div>
      <div className="womens-section">
          <div className='womens-shop'>
          {!loading && womensData.length <= 0 && <p>{''}</p>}
              {!loading && womensData.length >= 0 &&  womensData.map((item)=>{
                return <OutlateProduct key={uuidv4()} item={item} favorites={favorites}/>
              })}
          </div>
      </div>
      <Footer />
  </div>
  )
}

export default Women
