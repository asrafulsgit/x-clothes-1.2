import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {setCarts, setMessage } from '../../Authentication/Controllers/UserSlice';

const OutlateProduct = ({item}) => {
     const token = localStorage.getItem('token')
     const navigate = useNavigate()
     const {_id,brand,price,images} = item;
     const dispatch = useDispatch();
     const {carts,userInfo} = useSelector((state)=> state.authInfo)

     const hanleAddToCart=(id)=>{
          const cartInfo = {
               productId : id,
               userId    : userInfo.id
          }
          if(token){
               axios.post('http://localhost:8000/add-to-cart',cartInfo)
               .then((res)=>{
                    dispatch(setMessage(res.data.message))
                    // window.location.reload();
               }).catch((err)=>{
                    dispatch(setMessage(err.response.data.message))
               }) 
               setTimeout(() => {
                    const userId ={userId : userInfo.id}
                    axios.post('http://localhost:8000/get-user-carts', userId)
                    .then((res)=>{
                         dispatch(setCarts(res.data.cartProducts))
                    }).catch((err)=>{
                         dispatch(setMessage(err.response.data.message))
                    })
               }, 200);
          }else{
               navigate('/login')
          }

          
     }
  return (
     <div className="outlate-card">
          <div className="outlate-card-image">
               <img loading='lazy' className='image' src={images[0]} alt="" />
          </div>
          <div className="outlate-card-footer">
               <div className='outalate-card-band-price'>
                    <p className='brand'>{brand}</p>
                    <p className='price'>TK : {price}</p>
               </div>
               <div className='outlate-card-btns'>
                    <Link to={`/product/${_id}`} ><button className='outlate-buy-now-btn'>BUY NOW</button></Link>
                    <button onClick={()=>hanleAddToCart(_id)} className='outlate-add-to-cart-btn'><i className="fa-solid fa-plus"></i></button>
               </div>
          </div>
     </div>
  )
}

export default OutlateProduct
