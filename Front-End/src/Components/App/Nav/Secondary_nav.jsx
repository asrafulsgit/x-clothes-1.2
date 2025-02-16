import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import MensNav from './MensNav';
// import WomensNav from './WomensNav';
// import KidsNav from './KidsNav';
// import WinterNav from './WinterNav';

const Secondary_nav = ({hover}) => {
     const dispatch = useDispatch();
     const {loading,isLoggedIn,carts,favorites} = useSelector(state => state.authInfo)
     const subnav = localStorage.getItem('subnav')
  return (
     <div className={`secondary-nav ${subnav && 'secondary-nav-show'}`}
     // onMouseOver={()=>dispatch(setSecondaryNav(true))}
     // onMouseLeave={()=>dispatch(setSecondaryNav(false))}
     >
          <h1>hello i am sub nav</h1>
           {/* { hover === 'mens' ? <MensNav />
           : hover === 'womens' ?   <WomensNav /> 
           : hover === 'kids'? <KidsNav /> 
           : hover === 'winter' ? <WinterNav /> 
           : '' }      */}
     </div>
  )
}

export default Secondary_nav
