import React from 'react'

import './InvoiceCard.css'
const InvoiceCard = ({ordersInfo}) => {
    console.log("ordersInfo: ",ordersInfo)
  return (
    <div className='component__invoicecard'>
        <p>{ordersInfo.id}</p>
        <p>Status: {ordersInfo.status}</p>
        <p>Total amount: {ordersInfo.amount_total / 100} SEK</p>
        <p>Date: {new Date(ordersInfo.created*1000).toString()}</p>
        
    </div>
  )
}

export default InvoiceCard