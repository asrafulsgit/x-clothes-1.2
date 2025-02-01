import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './Kids.css'
// import { kids } from '../../../allProductDetails/allProduct'
import OutlateProduct from '../../App/Outlate/OutlateProduct'
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import kidsBanner from '../../../assets/banners/kids-banner.png'
import axios from 'axios';

import { useParams } from 'react-router-dom';

const Kids = () => {
  
  const {category}= useParams()
  const [kidsData,setKidsData]= useState([])
  const [loading,setLoading] = useState(true)
  const [favorites,setFavorites]=useState([])

  useEffect(()=>{
    if(category.length === 3){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : category})
      .then((res)=>{
        setKidsData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setWomensData([])
      })
    }
    if(category === '304014'){
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['301320','401420']})
      .then((res)=>{
        setKidsData(res.data.products)
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
    <div className='kids-page'>
      <Nav />
      <div className="kids-banner">
        <img src={kidsBanner} alt="Kids-banner" />
      </div>
      
      <div className="kids-section">
        <div className='kids-shop'>
        {!loading &&  kidsData.length <= 0 && <p>{''}</p>}
        {!loading && kidsData.length >= 0 &&  kidsData.map((item)=>{
            return <OutlateProduct key={uuidv4()} item={item} favorites={favorites}/>
        })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Kids
