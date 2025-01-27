import React from 'react'

import Nav from '../../App/Nav/Nav';
import Footer from '../../App/Footer/Footer';

import axios from 'axios';

const Favourite = () => {

    // const handleDelete=(id)=>{
    //   const data ={
    //     userId : userInfo.id,
    //     productId : id
    //   }
    //   axios.delete('http://localhost:8000/remove-from-favourite',{data})
    //   .then((res)=>{
    //     window.location.reload()
    //   }).catch((err=>{
    //       dispatch(setMessage(err.response.data.message))
    //   }))
    // }
    
  
    return (
      // <div className='cart-page'>
      //   <Nav />
      //   <div className='cart-page-header'>
      //     <h1>Favourites</h1>
      //     <p>"Ready to Rock Your New Look?"</p>
      //   </div>
      //   <div className='cart-main'>
      //       <div className='cart-cards'>{
      //         favourites.length <= 0 ? <p className='empty-message'>Your cart is empty!</p> :
      //         favourites.map((item)=>{
      //           const {_id,images,title,price}= item;
      //             return  (
      //                 <div key={_id} className='cart-card'>
      //                   <img src={images[0]} alt="" />
      //                   <h1 className='title'>{title.length > 30 ? item.title.slice(0,25)+'...' : item.title}</h1>
      //                   <p className='price'>BDT : {price}</p>
      //                   <button onClick={()=>handleDelete(_id)} className='remove-cart-item-btn'>Remove</button>
      //                 </div>
      //             )
      //           })}
      //       </div>
      //   </div>
      //   <Footer />
      // </div>
      <h1>favourite page</h1>
    )
  }

export default Favourite
