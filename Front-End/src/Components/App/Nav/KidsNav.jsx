import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSecondaryNav, setSelectedCategory } from '../../Authentication/Controllers/UserSlice';
import image from '../../../assets/nav-image/kids.jpg'
const KidsNav = () => {
    const dispatch = useDispatch()
     const hanldeClick =(subcategory)=>{
        dispatch(setSelectedCategory(subcategory))
        dispatch(setSecondaryNav(false))
     }
     const boysNavData =[
          {name : 'Shirts', subcategory : '301'},
          {name : 'T-shirts', subcategory : '302'},
          {name : 'Pants', subcategory : '304'},
          {name : 'Panjabi', subcategory : '303'}
        ]
    const girlsNavData =[
          {name : 'Three-piece', subcategory : '401'},
          {name : 'Two-piece', subcategory : '402'},
          {name : 'Tops', subcategory : '403'},
          {name : 'T-shirts', subcategory : '404'},
          {name : 'Gowns', subcategory : '405'},
          {name : 'Frocks', subcategory : '406'},
    ]
  return (
    <>
      <div className='kids-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div  className='winter-secondary-nav-links'>
                  <div className='secondary-nav-links'>
                    <h2>Boys</h2>
                    {boysNavData.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to='/kids' 
                      onClick={()=>hanldeClick(subcategory)}>{name}</NavLink>
                    })} 
                  </div> 
                  <div className='secondary-nav-links'>
                    <h2>Girls</h2>
                    {girlsNavData.map((item,index)=>{
                      const {name,subcategory}= item;
                      return <NavLink key={index} to='/kids' onClick={()=>hanldeClick(subcategory)} >{name}</NavLink>
                    })} 
                  </div> 
                </div>
     </div>
    </>
  )
}

export default KidsNav
