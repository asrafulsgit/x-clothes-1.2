import React, { useEffect, useState } from 'react'

import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';

import axios from 'axios';

const Favourite = () => {
   const [favorites,setFavorites]=useState([])
   const [loading,setLoading]=useState(true)
    useEffect(()=>{
      axios.get(`http://localhost:8000/get-to-favourite`,{
        withCredentials : true
      })
      .then((res)=>{
        //  console.log(res)
         setFavorites(res.data.products)
         setLoading(false)
      }).catch((err)=>{
        console.log(err)
      })
    },[])

    const handleDelete=(id)=>{
      setLoading(true)
      const filteredFavorites = favorites.filter(item => item._id !== id)
      setFavorites(filteredFavorites)
      axios.delete(`http://localhost:8000/remove-from-favourite/${id}`,{
        withCredentials : true
      })
      .then((res)=>{
        console.log(res)
        setLoading(false)
      }).catch((err)=>{
          console.log(err)
      })
    }
    
  
    return (
      <div className='cart-page'>
        <Nav />
        <div className='cart-page-header'>
          <h1>Favourites</h1>
          <p>"Ready to Rock Your New Look?"</p>
        </div>
        <div className='cart-main'>
            <div className='cart-cards'>
              {loading && <p>Loading....</p> }
              {!loading && favorites.length <= 0 && <p className='empty-message'>Your cart is empty!</p> }
              {!loading && favorites.length >= 1 && favorites.map((item)=>{
                const {_id,images,title,price}= item;
                  return  (
                      <div key={_id} className='cart-card'>
                        <img src={images[0]} alt="" />
                        <h1 className='title'>{title.length > 30 ? item.title.slice(0,25)+'...' : item.title}</h1>
                        <p className='price'>BDT : {price}</p>
                        <button onClick={()=>handleDelete(_id)} className='remove-cart-item-btn'>Remove</button>
                      </div>
                  )
                })
              }
            </div>
        </div>
        <Footer />
      </div>
    )
  }

export default Favourite
