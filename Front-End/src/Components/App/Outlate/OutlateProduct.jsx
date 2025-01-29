import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const OutlateProduct = ({item,favorites}) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const {_id,brand,price,images} = item;
     const [isLoading,setIsLoading]= useState(true)

     const [isFavourite,setIsFavourite]= useState(false)
     
     // favorite-btn-loading
     const [favoriteLoading,setFavoriteLoading]= useState(false)

     // add-to-card-btn-loading
     const [isAdded,setIsAdded]= useState(false)

     const isFavorite = (productId) => favorites.includes(productId);
     useEffect(()=>{
          setIsFavourite(isFavorite(_id))
     },[])
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
     const handleFavourite=(id)=>{
          setFavoriteLoading(true)
               const data ={
                    productId : id
               }

               if(!isFavourite){
                    console.log('addd')
                    axios.post('http://localhost:8000/add-to-favourite',data,{
                         withCredentials : true
                       })
                       .then((res)=>{
                            console.log(res)
                            setIsFavourite(true)
                            setFavoriteLoading(false)
                       }).catch((err)=>{
                            console.log(err)
                            setIsFavourite(false)
                       })
               } 

               if(isFavourite){
                    console.log('delete')
                    axios.delete(`http://localhost:8000/remove-from-favourite/${id}`,{
                         withCredentials : true
                    }                     
                    ).then((res)=>{
                         setIsFavourite(false)
                         setFavoriteLoading(false)
                    }).catch((err=>{
                    //   dispatch(setMessage(err.response.data.message))
                      setIsFavourite(true)
                    }))
               } 
               // isFavorite(id)
     }

  return (
     <div className="outlate-card">
          <div className="outlate-card-image"> 
               <button onClick={()=>handleFavourite(_id)} className='add-to-favourite-btn' >
                    {favoriteLoading ?
                         <div className="loadingio-spinner-rolling-nq4q5u6dq7r ">
                              <div className="ldio-x2uulkbinbj favorite-spinner">
                                   <div></div>
                              </div>
                         </div>
                    : <i className={`fa-${isFavourite ? 'solid' : 'regular'} fa-heart`}></i>}  
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
