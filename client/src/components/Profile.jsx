import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Profile = () => {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:9000/login/success', { withCredentials: true })
        setUserData(response.data.user)
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    }
    fetchUser()
  }, [])
  console.log(userData)
  return (
    <div>
      <Navbar />
      <div>
        <img src={userData.ownerImg} alt="owner Image" />
        <div>
          
        </div>
      </div>
    </div>
  )
}

export default Profile
