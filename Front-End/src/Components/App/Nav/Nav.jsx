import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Nav.css'

import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts, setMessage, setSelectedCategory, setSecondaryNav } from '../../Authentication/Controllers/UserSlice'
import MensNav from './MensNav'
import WomensNav from './WomensNav'
import KidsNav from './KidsNav'
import WinterNav from './WinterNav'
const Nav = () => {
  const dispatch = useDispatch();
  const {secondaryNav} = useSelector(state => state.authInfo)
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const {carts,userInfo} = useSelector(state => state.authInfo)
  // nav settings
  const [navbg, setNavbg]= useState(false)

  // const [menu, setMenu]= useState(false)
  // const closeMenu =(closeMenu)=>{
  //     setMenu(closeMenu)
  // }

  useEffect(()=>{
      window.addEventListener('scroll', ()=>{
        window.scrollY > 50 ? setNavbg(true) : setNavbg(false);
      })   
        const userId = {userId : userInfo.id}
        if(userInfo.id){
                axios.post('http://localhost:8000/get-user-carts', userId)
                .then((res)=>{
                      dispatch(setCarts(res.data.cartProducts))
                }).catch((err)=>{
                      dispatch(setMessage(err.response.data.message))
                })
        }
  },[userInfo])
  
  const [hover,setHover] = useState('')
  // const [secondaryNav,setSecondaryNav]= useState(false)
  const handleMouseHover =(hoverItem)=>{
    setHover(hoverItem)
    setNavbg(true)
    dispatch(setSecondaryNav(true))
  }
  const hanldeLeave =()=>{
      dispatch(setSecondaryNav(false))
  }
  const hanldeClick=()=>{
    dispatch(setSelectedCategory(''))
  }

  const navLinksData =[
    {
      name : 'Winter',
      hover : 'winter',
      path : '/winter',
      categories: ['102130','230240','330340','420440']
    },
    {
      name : `Men's`,
      hover : 'mens',
      path : '/men',
      categories: ['101120']
    },
    {
      name : `Women's`,
      hover : 'womens',
      path : '/women',
      categories: ['201230']
    },
    {
      name : `Kid's`,
      hover : 'kids',
      path : '/kids',
      categories: ['301320','401420']
    }
  ]
  return (
    <>
    <header className='nav-page'>  
        <nav className={`nav ${navbg && 'navBg'}`}>
            <NavLink to='/' className='nav-logo'><h1 className='logo'><span>X</span> Clothes</h1></NavLink>   
            <div className="web-pages-nav">
                  {navLinksData.map((item,index)=>{
                    const {name,hover,path} = item;
                    return(
                      <NavLink key={index} 
                      to={path} 
                      onClick={hanldeClick} 
                      onMouseOver={()=>handleMouseHover(hover)}
                      onMouseLeave={hanldeLeave}>{name}</NavLink>
                    )
                  })}
            </div>  
            <div className="nav-links">
                  <NavLink to='/cart' >
                    <button className='nav-item cart-section-btn'>
                      <i className="fa-solid fa-cart-shopping"></i>
                      {isLoggedIn && <p className='total-carts-number'>{carts.length}</p>}
                    </button></NavLink>
                  <NavLink to='/favourite' ><button className='nav-item'><i className="fa-regular fa-heart"></i></button></NavLink>
                  
                  {isLoggedIn ? 
                  <NavLink to='/profile'>
                    <button className='nav-item'><i className="fa-regular fa-user"></i></button>
                  </NavLink> : 
                  <NavLink to='/login' >
                    <button className='nav-item'><i className="fa-solid fa-user"></i></button>
                  </NavLink>}
                  
                  <button className='menu-btn mobile-nav' onClick={()=> setMenu(true)}  ><i className="fa-solid fa-bars"></i></button> 
            </div>
        </nav>
        

        {/*sub nav */}
        <div className={`secondary-nav ${secondaryNav && 'secondary-nav-show'}`}
        onMouseOver={()=>dispatch(setSecondaryNav(true))}
        onMouseLeave={()=>dispatch(setSecondaryNav(false))}
        >
              { hover === 'mens' ? <MensNav />
              : hover === 'womens' ?   <WomensNav /> 
              : hover === 'kids'? <KidsNav /> 
              : hover === 'winter' ? <WinterNav /> 
              : '' }     
        </div>
    </header>
    </>
  )
}

export default Nav
