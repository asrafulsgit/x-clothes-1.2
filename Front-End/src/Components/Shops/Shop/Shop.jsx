import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import './Shop.css'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import OutlateProduct from '../../App/Outlate/OutlateProduct'
// import AllProduct from '../../../allProductDetails/allProduct';

const Shop = () => {
  console.log('hello')
  const [data,setData]= useState()
  return (
    <>
      <Nav />
      <div className='shop'>
          {data.map((item)=>{
            return <OutlateProduct key={uuidv4()} item={item}/>
          })}
      </div>
      <Footer />
    </>
    
  )
}

export default Shop
