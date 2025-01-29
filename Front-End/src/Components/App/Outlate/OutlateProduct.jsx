import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const OutlateProduct = ({item}) => {
     const dispatch = useDispatch();
     const navigate = useNavigate()
     const {_id,brand,price,images} = item;
     const [isFavourite,setIsFavourite]= useState(false)
     const [isLoading,setIsLoading]= useState(true)
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
     const handleFavourite=(id)=>{
               const data ={
                    productId : id
                  }
               axios.delete('http://localhost:8000/remove-from-favourite',{data})
                  .then((res)=>{
                    setIsFavourite(false)
                  }).catch((err=>{
                      dispatch(setMessage(err.response.data.message))
                      setIsFavourite(true)
                    }))
    
                    axios.post('http://localhost:8000/add-to-favourite',cartInfo)
                    .then((res)=>{
                         // console.log(res)
                         setIsFavourite(true)
                    }).catch((err)=>{
                         console.log(err)
                         setIsFavourite(false)
                    }) 
         
     }
     const hanldeMouseHover=(id)=>{
          // const cartInfo = {
          //      productId : id,
          //      userId    : userInfo.id
          // }
          //      axios.post('http://localhost:8000/check-from-favourite',cartInfo)
          //      .then((res)=>{
          //           dispatch(setMessage(res.data.message))
          //           setIsFavourite(res.data.success)
          //           setIsLoading(false)
          //      }).catch((err)=>{
          //           dispatch(setMessage(err.response.data.message))
          //           setIsFavourite(err.response.data.success)
          //           setIsLoading(false)
          //           console.clear()
          //      }) 
     }
  return (
     <div className="outlate-card" onMouseEnter={()=>hanldeMouseHover(_id)}>
          <div className="outlate-card-image">
               {!isLoading && 
               <button onClick={()=>handleFavourite(_id)} className='add-to-favourite-btn' >
                    <i className={`fa-${isFavourite ? 'solid' : 'regular'} fa-heart`}></i>  
               </button> }
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
