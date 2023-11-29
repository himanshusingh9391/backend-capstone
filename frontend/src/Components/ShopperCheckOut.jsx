import React from 'react'
import Nav from './Nav';
import success from '../assets/success.png';
import '../Components/ShopperCheckOut.css';

function CheckOut() {

  return (
    <>
      <div style={{ marginTop: '-4rem' }}>
        <Nav />
      </div>
      <div className='center'>
        <img src={success} style={{height:650,width:650}} />
      </div>
    </>
  )
}

export default CheckOut