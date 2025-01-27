import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Cart.css'

import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'

const Cart = () => {

  const handleDelete=(id)=>{
    // const data ={
    //   userId : ,
    //   productId :
    // }
    // axios.delete('http://localhost:8000/remove-cart-item',{data})
    // .then((res)=>{
    //   // window.location.reload()
    // }).catch((err=>{
    //     // dispatch(setMessage(err.response.data.message))
    // }))
  }
  

  return (
    // <div className='cart-page'>
    //   <Nav />
    //   <div className='cart-page-header'>
    //     <h1>Cart</h1>
    //     <p>"Ready to Rock Your New Look?"</p>
    //   </div>
    //   <div className='cart-main'>
    //       <div className='cart-cards'>{
    //         carts.length <= 0 ? <p className='empty-message'>Your cart is empty!</p> :
    //         carts.map((item)=>{
    //             return  (
    //                 <div key={item._id} className='cart-card'>
    //                   <img src={item.images[0]} alt="" />
    //                   <h1 className='title'>{item.title.length > 30 ? item.title.slice(0,25)+'...' : item.title}</h1>
    //                   <div className='quantity-div'>
    //                       <p>Quantity : </p>
    //                       <p className='quantity'>{item.quantity}</p>
    //                   </div>
    //                   <p className='price'>BDT : {item.price}</p>
    //                   <button onClick={()=>handleDelete(item._id)} className='remove-cart-item-btn'>Remove</button>
    //                 </div>
    //             )
    //           })}
    //       </div>
    //   </div>
    //   <Footer />
    // </div>
    <h1>cart page</h1>
  )
}

export default Cart
