import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Nav.css'

import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedCategory, setSecondaryNav } from '../../Authentication/Controllers/UserSlice'
import MensNav from './MensNav'
import WomensNav from './WomensNav'
import KidsNav from './KidsNav'
import WinterNav from './WinterNav'
import socket from '../../../../socket'
const Nav = () => {
  const dispatch = useDispatch();
  const {secondaryNav} = useSelector(state => state.authInfo)
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  // nav settings
  const [navbg, setNavbg]= useState(false)
  const [carts,setCarts]= useState(0)
  const [favorites,setFavorites]=useState(0)
  useEffect(()=>{
      window.addEventListener('scroll', ()=>{
        window.scrollY > 50 ? setNavbg(true) : setNavbg(false);
      })

      socket.on('carts',(data)=> setCarts(data))
      socket.on('favourites',(data)=> setFavorites(data))

      axios.get("http://localhost:8000/favorite/count", {
        withCredentials: true,
      }).then((res)=>{
        setFavorites(res.data.count);
      }). catch((err)=>{
        console.log(err)
      }) 

      axios.get("http://localhost:8000/cart/count", {
        withCredentials: true,
      }).then((res)=>{
        setCarts(res.data.count);
      }). catch((err)=>{
        console.log(err)
      }) 

      // token refresh
      axios.get('http://localhost:8000/access/token/refresh',{
        withCredentials : true
      }).then((res)=>{
        // console.log(res)
        setIsLoggedIn(true)
      }).catch((err)=>{
        console.log(err)
      })  
  },[])
  const [hover,setHover] = useState('')
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
                      {isLoggedIn && <p className='total-carts-number'>{carts}</p>}
                    </button>
                  </NavLink>
                  <NavLink to='/favourite' >
                    <button className='nav-item cart-section-btn'>
                      <i className="fa-regular fa-heart"></i>
                      {isLoggedIn && <p className='total-carts-number'>{favorites}</p>}
                    </button>
                  </NavLink>
                  
                  {/* {isLoggedIn ? 
                  <NavLink to='/profile'>
                    <button className='nav-item'><i className="fa-regular fa-user"></i></button>
                  </NavLink> :  */}
                  <NavLink to='/login' >
                    <button className='nav-item'><i className="fa-solid fa-user"></i></button>
                  </NavLink>
                  {/* } */}
                  
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
