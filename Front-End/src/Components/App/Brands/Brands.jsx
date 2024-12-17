import React from 'react'
import './Brands.css'
import easy from '../../../assets/brands/easy.png'
import aarong from '../../../assets/brands/aarong.webp'
import ecstasy from '../../../assets/brands/ecstasy.png'
import rawNation from '../../../assets/brands/raw nation.png'
import Richman from '../../../assets/brands/Richman.webp'
import turaag from '../../../assets/brands/turaag.webp'
import twelve from '../../../assets/brands/twelve.avif'

const Brands = () => {
     const brnads = [
          easy,aarong,ecstasy,rawNation,Richman,turaag,twelve
     ]
  return (
     <marquee className='brnads-page' width="100%" direction="left" behavior="scroll">
          {brnads.map((img,index)=>{
               return(
                    <img className='image' src={img} key={index} alt="brand name" />
               )
          })}
     </marquee>
  )
}

export default Brands
