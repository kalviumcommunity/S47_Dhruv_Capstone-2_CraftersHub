import React from 'react'
import { useSearchParams } from 'react-router-dom'
const OrderPlaced = () => {
    const searchQuery = useSearchParams()[0]

    const referenceValue = searchQuery.get('reference')

  return (
    <div>
      <h1>Order Placed</h1>
      <p>Your payment id is {referenceValue}</p>
    </div>
  )
}

export default OrderPlaced
