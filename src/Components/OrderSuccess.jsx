import React from 'react'
import tick from './../assets/images/tick.webp'
import './style/ordersuccess.css'

// components for successfully placed order
const OrderDetails = () => {
  return (
    <div className='ordered_box'>
      <div>
        <h1 className='order_heading'> Ordered </h1>
        <div className='ordered_in'>
          <img src={tick} alt="tick" className='tick_img' />
          <p className='para'> Your order has been successfully placed. </p>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
