import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


import OutlateProduct from '../OutlateProduct'

const MensOutLate = () => {
     useEffect(()=>{
         
     },[])
  return (
     <>
          <div className="out-late-item-header">
               <div className="out-late-item-header-title">
                    <h1>Men's Wear</h1>
               </div>
               <div className="out-late-item-header-sub-title">
                    <p>"Gentleman's Closet"</p>
               </div>
          </div>
          <div className='out-late-item'>
               {/* {bestSellers.map((item)=>{
               return <OutlateProduct key={uuidv4()} item={item}/>
               })} */}
          </div>
     </> 
  )
}

export default MensOutLate
