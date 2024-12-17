import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setSecondaryNav, setSelectedCategory } from '../../Authentication/Controllers/UserSlice';
import image from '../../../assets/nav-image/winter.jpg'

const WinterNav = () => {
  const dispatch = useDispatch()
  const hanldeClick =(category)=>{
     dispatch(setSelectedCategory(category))
     dispatch(setSecondaryNav(false))
  }
     const winterNavData ={
        winterMens : [
                  {
                    name : 'Sweater',
                    subcategory : '120',
                  },
                  {
                    name : 'Hoodie',
                    subcategory : '121'
                  },
                  {
                    name : 'Blazer',
                    subcategory : '122'
                  },
                  {
                    name : 'Jacket',
                    subcategory : '123'
                  }
                 
        ],
        winterWomens : [
                {
                  name : 'Poncho',
                  subcategory : '231'
                },
                {
                  name : 'Sweater',
                  subcategory : '232'
                },
                {
                  name : 'Jacket',
                  subcategory : '233'
                },
                {
                  name : 'Hoodie',
                  subcategory : '234'
                },
                {
                  name : 'Blazer',
                  subcategory : '235'
                },
        ],
        winterBoys : [
              {
                name : 'Sweater',
                subcategory : '331'
              },
              {
                name : 'Hoodie',
                subcategory : '332'
              },
              {
                name : 'Jacket',
                subcategory : '333'
              },
        ],
        winterGirls : [
              {
                name :'Sweater',
                subcategory : '421' 
              },
              {
                name :'Hoodie',
                subcategory : '422' 
              },
              {
                name :'Jacket',
                subcategory : '423' 
              }
        ]
     }
  return (
    <>
      <div className='secondary-nav-item winter-secondary-nav'>
                <div className='secondary-nav-product'>
                    <img src={image} alt="" />
                </div>
                <div  className='winter-secondary-nav-links'>
                    {/* winter mens nav */}
                    <div className='secondary-nav-links '>
                      <h2>Mens</h2>
                      {winterNavData.winterMens.
                      map((item,index)=>{
                        const {name,subcategory}= item;
                        return <NavLink key={index} to='/winter' onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                      })}  
                    </div>
                    {/* winter womens nav */}
                    <div className='secondary-nav-links'>
                      <h2>Womens</h2>
                      {winterNavData.winterWomens.
                      map((item,index)=>{
                        const {name,subcategory}= item;
                        return <NavLink key={index} to='/winter' onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                      })}  
                    </div>
                    {/* winter kids nav */}
                    <div className='kids-winter-secondary-nav'>
                      {/* winter kids-boys nav */}
                      <div className='secondary-nav-links'>
                        <h2>Boys</h2>
                        {winterNavData.winterBoys.
                        map((item,index)=>{
                          const {name,subcategory}= item;
                          return <NavLink key={index} to='/winter' onClick={()=> hanldeClick(subcategory)}>{name}</NavLink>
                        })}  
                      </div>
                      {/* winter kids-girls nav */}
                      <div className='secondary-nav-links'>
                        <h2>Girls</h2>
                        {winterNavData.winterGirls.
                        map((item,index)=>{
                          const {name,subcategory}= item;
                          return <NavLink key={index} to='/winter' onClick={()=> hanldeClick(subcategory)} >{name}</NavLink>
                        })}  
                      </div>
                    </div>
                </div>
                
       </div>
    </>
  )
}

export default WinterNav
