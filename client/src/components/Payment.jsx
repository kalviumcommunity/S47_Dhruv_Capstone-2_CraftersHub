import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const Payment = () => {
  const location = useLocation()
  const { price } = location.state
  const [user, setUser] = useState([])

  useEffect(() => {
    //fetch user
    const fetchUser = async () => {
      try {
        let headers = { withCredentials: true }
        const id = localStorage.getItem('id')

        if (id) {
          headers['Authorization'] = `Bearer ${id}`
        }
        const response = await axios.get('http://localhost:9000/login/success', { headers })
        setUser(response.data.user)
        console.log("user Available");
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    }
    fetchUser()
    //order
    createOrder()
  }, [])
  console.log(user);
  // Create order
  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:9000/product/payment', {
        price
      })
      console.log(response.data.order.amount);
      const options = {
        amount: response.data.order.amount,
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        currency: "INR",
        name: "Crafters hub",
        description: "Crafters hub",
        image: "https://res.cloudinary.com/dhruv1184/image/upload/v1712914306/uyumc8u8kp4zihunsb2c.png",
        order_id: response.data.order.id,
        callback_url: "http://localhost:9000/product/paymentVerification",
        prefill: {
          "name": user.name,
          "email": user.username,
          "contact": user.contact
        },
        notes: {
          "address": "Razorpay Corporate Office"
        },
        theme: {
          "color": "#528FF0"
        }
      };

      const razor = new window.Razorpay(options)
      razor.open()
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
      <h1>{price}</h1>
    </div>
  )
}

export default Payment
