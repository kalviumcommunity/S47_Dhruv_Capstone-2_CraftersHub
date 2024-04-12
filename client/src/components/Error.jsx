import React from 'react'
import { useNavigate } from 'react-router-dom'
const Error = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h1>Please login first</h1>
      <button onClick={()=>navigate('/')}>Back to home</button>
    </div>
  )
}

export default Error
