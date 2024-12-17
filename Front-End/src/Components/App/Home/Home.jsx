import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'


import Nav from '../Nav/Nav'
import Display from '../Display/Display'
import Banner from '../Banner/Banner'
import Contact from '../Contact/Contact'
import Footer from '../Footer/Footer'

import NewArrivals from '../NewArrivals/NewArrivals'
import OutLate from '../Outlate/OutLate'
import Show from '../Show/Show'
import BestSellers from '../Outlate/BestSellers/BestSellers'
import Brands from '../Brands/Brands'



const Home = () => {

  return (
    <div>
        <Nav />
        <div>
          <Display />
          {/* <Brands /> */}
          <Show />
          <BestSellers />
          <NewArrivals />
        </div>
        <div className='main'>     
            <OutLate />
            <Banner />  
            <Contact /> 
        </div>
        <Footer />
    </div>
  )
}

export default Home
