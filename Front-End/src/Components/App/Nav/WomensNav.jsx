import React from 'react'
import { NavLink } from 'react-router-dom';

import image from '../../../assets/nav-image/womens.jpg'

const WomensNav = (subNavClose) => {
  const hanldeClick =()=>{
    subNavClose(false)
 }
     const womensCategories =[
          {
            subcategory : '201',
            name : 'Saree'
          },
          {
            subcategory : '202',
            name : 'Shalwar-Kamiz'
          },
          {
            subcategory : '203',
            name : 'Kurta'
          },
          {
            subcategory : '209',
            name : 'Three-Piece'
          },
          {
            subcategory : '210',
            name : 'Two-Piece'
          },
          {
            subcategory : '211',
            name : 'Dresses'
          },
          {
            subcategory : '212',
            name : 'Shrugs'
          },
          {
            subcategory : '213',
            name : 'Ponchos'
          },
          {
            subcategory : '204',
            name : 'Pants'
          },
          {
            subcategory : '205',
            name : 'Hijab'
          },
          {
            subcategory : '206',
            name : 'Hudi'
          },
          {
            subcategory : '207',
            name : 'T-Shirt'
          },
          {
            subcategory : '208',
            name : 'Tops'
          },
        ]
  return (
    <>
      <div className='womens-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div className='secondary-nav-links'>
                    {womensCategories &&
                    womensCategories.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to={`/women/${subcategory}`} onClick={()=>hanldeClick(subcategory)} >{name}</NavLink>
                    })}  
                </div>
       </div>
    </>
  )
}

export default WomensNav
