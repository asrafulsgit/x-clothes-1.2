import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import './Winter.css'
import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';
import womensBanner from '../../../assets/banners/winter-banner.png'
import Card from '../Card';

const Winter = () => {
  const {category} = useParams()
  const [loading,setLoading] = useState(true)
  const [winterData,setWinterData]= useState([])
  useEffect(()=>{
    if(category.length === 3){
      axios.post('http://localhost:8000/get-product-by-subcategory', {subcategory : category})
      .then((res)=>{
        setWinterData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setWinterData([])
      })
    } 
    if(category === '10233342'){
      axios.post('http://localhost:8000/get-product-by-categoris',{categories : ['120130','230240','330340','420440']})
      .then((res)=>{
        setWinterData(res.data.products)
        setLoading(false)
      }).catch((err)=>{
        console.log(err.response.data.message)
      })
    }
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
              {!loading && winterData.length <= 0 && <p>{''}</p>}
              {!loading && winterData.length >= 0 &&  winterData.map((item)=>{
                return <Card key={uuidv4()} item={item} />
              })}
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default Winter
