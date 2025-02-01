import React from 'react'
import { useDispatch} from 'react-redux'
import { NavLink} from 'react-router-dom';
import { setSecondaryNav } from '../../Authentication/Controllers/UserSlice';
import image from '../../../assets/nav-image/mens.jpg'

const MensNav = () => {
     const dispatch = useDispatch()
     const hanldeClick =()=>{
        dispatch(setSecondaryNav(false))
     }
     const mensCategories =[
          {
            id : 101,
            name : 'Shirt',
            category : '101'
          },
          {
            id : 102,
            name : 'T-Shirt',
             category : '102'
          },
          {
            id : 106,
            name : 'Pangabi',
            category : '105'
          },
          {
            id : 103,
            name : 'Pants',
            category :'103'
          },
          {
            id : 104,
            name : 'Short-Pants',
            category : '104'
          },
          {
            id : 105,
            name : 'Jerseys',
            category : '106'
          },
        ]
  return (
    <>
      <div className='mens-secondary-nav secondary-nav-item'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                  <div className='secondary-nav-links'>
                    {mensCategories &&
                    mensCategories.map((item,index)=>{
                      const {name,category}= item;
                      return <NavLink key={index} to={`/men/${category}`} onClick={()=>hanldeClick(category)}>{name}</NavLink>
                    })}
                  </div> 
       </div>
    </>
  )
}

export default MensNav
