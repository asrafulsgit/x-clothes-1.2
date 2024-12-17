import React from 'react'

import './Outlate.css'
import BestSellers from './BestSellers/BestSellers'
import MensOutLate from './MensOutLate/MensOutLate'
import WomensOutLate from './WomensOutLate/WomensOutLate'
import KidsOutLate from './KidsOutLate/KidsOutLate'

const OutLate = () => {
  return (
    <div className='out-late'>
      {/* <BestSellers /> */}
      <MensOutLate />
      <WomensOutLate />
      <KidsOutLate />
    </div>
  )
}

export default OutLate
