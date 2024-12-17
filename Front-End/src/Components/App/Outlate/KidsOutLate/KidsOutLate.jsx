import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import OutlateProduct from '../OutlateProduct'

const KidsOutLate = () => {
     
  return (
     <>
          <div className="out-late-item-header">
               <div className="out-late-item-header-title">
                    <h1>kid's Wear</h1>
               </div>
               <div className="out-late-item-header-sub-title">
                    <p>"Fun, Stylish, and Comfortable Clothing for Kids"</p>
               </div>
          </div>
          <div className='out-late-item'>
               {/* {womensOutlate.map((item)=>{
               return <OutlateProduct key={uuidv4()} item={item}/>
               })} */}
          </div>
     </> 
  )
}

export default KidsOutLate
