import React, { useEffect, useState } from 'react'
import logo from '../assets/CrafersHubLogo.png'
import nav from '../css/nav.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { object } from 'yup'
const Navbar = () => {
    const navigate = useNavigate()
  const [userData,setUserData] = useState({})
    const fetchUser =async ()=>{
      try {
          const response = await axios.get('http://localhost:9000/login/success',{withCredentials:true})
          console.log("response",response);
          setUserData(response.data.user)
      } catch (error) {
          console.log(error);
      }
  }
  console.log(userData);
  useEffect(()=>{
    fetchUser()
  },[])

  const logout = ()=>{
    window.open('http://localhost:9000/logout',"_self")
  }
  return (
    <div className={nav.nav}>
      <div className={nav.title} onClick={()=>navigate('/')}>
        <img src={logo} alt="logo" className={nav.logo} />
        <h1>Crafters Hub</h1>
      </div>
      <div className={nav.opt}>
        {
          Object.keys(userData)?.length > 0 ?(
          <>
          <button className={nav.btn} onClick={()=>navigate('/product')} >Products</button>
          <button className={nav.btn} onClick={()=>navigate('/profile')}>Profile</button>
          <button className={nav.btn}>Chats</button>
          <button onClick={logout}>Logout</button>
          </>):
          <>
          <button className={nav.btn} onClick={()=>navigate('/login')}>Login</button>
          <button className={nav.btn} onClick={()=>navigate('/signup')}>Signup</button>
          </>
          
        }
      </div>
    </div>
  )
}

export default Navbar
