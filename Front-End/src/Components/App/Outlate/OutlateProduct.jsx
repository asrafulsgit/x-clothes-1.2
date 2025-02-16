import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
// import {addToFavorite,deleteToFavorite} from '../../Authentication/Controllers/Function'
const OutlateProduct =({item,favorites}) => { 
     const {_id,brand,price,images} = item;
     //  console.log('card')
     // favorite setup
     const favorite = favorites.includes(_id);
     const [isFavorite,setIsFavorite]= useState(favorite)
     const [favoriteLoading,setFavoriteLoading]= useState(false)
    
     // cart setup
     const [isAdded,setIsAdded]= useState(false)

     const hanleAddToCart=(id)=>{
          setIsAdded(true)
          const cartInfo = {
               productId : id
          }
          axios.post('http://localhost:8000/add-to-cart',cartInfo,{
               withCredentials : true
          })
          .then((res)=>{
               // console.log(res)
               setIsAdded(false)
          }).catch((err)=>{
               console.log(err)
               setIsAdded(false)
          }) 
            
     }
     const handleFavourite=(id,isFavorite)=>{ 
          // setFavoriteLoading(true)  
          // // if(!isFavorite){
          // //      axios.post('http://localhost:8000/add-to-favourite',{productId : id},{
          // //           withCredentials : true
          // //      }).then((res)=>{
          // //           console.log(res)
          // //           setIsFavorite(true)
          // //           setTimeout(() => {
          // //                setFavoriteLoading(false)
          // //           }, 10000);
          // //      }).catch((err=>{
          // //           console.log(err)
          // //      }))
          // // }else{
          // //      console.log('delete')
          // //      const productId = id;
          // //      axios.delete(`http://localhost:8000/remove-from-favourite/${productId}`,{
          // //           withCredentials : true
          // //      }                     
          // //      ).then((res)=>{
          // //           console.log(res)
          // //           setIsFavorite(false)
          // //           setFavoriteLoading(false)

          // //      }).catch((err=>{
          // //           console.log(err)
          // //           // return true;
          // //      }))
          // //      // deleteToFavorite(id)
          // //      // setFavoriteLoading(false)
          // // }     
          // setTimeout(() => {
          //      setFavoriteLoading(false) 
          // }, 2000);
     }
     // console.log(isFavorite)
     // console.log(favoriteLoading)
  return (
     <div className="outlate-card">
          <div className="outlate-card-image"> 
               <button  onClick={()=>handleFavourite(_id,isFavorite)} className='add-to-favourite-btn' >
                    {favoriteLoading ?  <p>loading</p>
                         // <div className="loadingio-spinner-rolling-nq4q5u6dq7r ">
                         //      <div className="ldio-x2uulkbinbj favorite-spinner">
                         //           <div></div>
                         //      </div>
                         // </div>
                    : <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart`}></i>}  
               </button> 
               <img loading='lazy' className='image' src={images[0]} alt="" />
          </div>
          <div className="outlate-card-footer">
               <div className='outalate-card-band-price'>
                    <p className='brand'>{brand}</p>
                    <p className='price'>TK : {price}</p>
               </div>
               <div className='outlate-card-btns'>
                    <Link to={`/product/${_id}`} ><button className='outlate-buy-now-btn'>BUY NOW</button></Link>
                    <button onClick={()=>hanleAddToCart(_id)} 
                    className='outlate-add-to-cart-btn'>
                         {isAdded ? 
                         <div className="loadingio-spinner-rolling-nq4q5u6dq7r">
                              <div className="ldio-x2uulkbinbj">
                                   <div></div>
                              </div>
                         </div>
                         : <i id='add-icon' className="fa-solid fa-plus"></i> } 
                    </button>
               </div>
          </div>
     </div>
  )
}

export default OutlateProduct
