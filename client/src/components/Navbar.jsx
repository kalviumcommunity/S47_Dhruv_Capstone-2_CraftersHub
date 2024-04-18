import React, { Fragment, useEffect, useState } from 'react'
import logo from '../assets/CrafersHubLogo.png'
import nav from '../css/nav.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { object } from 'yup'
const Navbar = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({})
  const fetchUser = async () => {
    // let head
    const id = localStorage.getItem('id')
    let headers = { withCredentials: true }
    if (id) {
      headers['Authorization'] = `Bearer ${id}`
      // head= {headers : {
      //   'Authorization': `Bearer ${id}`
      // }}
      console.log("id available");
    // }else{
    //   head = { withCredentials: true }
    }
    try {
      const response = await axios.get('http://localhost:9000/login/success', { headers })
      console.log("response", response);
      setUserData(response.data.user)
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userData);
  useEffect(() => {
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.clear()
    window.open('http://localhost:9000/logout', "_self")
  }
  return (
    <div className={nav.nav}>
      <div className={nav.title} onClick={() => navigate('/')}>
        <img src={logo} alt="logo" className={nav.logo} />
        <h1>Crafters Hub</h1>
      </div>
      <div className={nav.opt}>
        {
          Object.keys(userData)?.length > 0 ? (
            <div className={nav.opts}>
              <span className={nav.name}>Welcome {userData.name}</span>
              <button className={nav.btn} onClick={() => navigate('/product')} >Products</button>
              <button className={nav.btn} onClick={() => navigate('/profile')}>Profile</button>
              <button className={nav.btn}>Chats</button>
              <button onClick={logout}>Logout</button>
            </div>) :
            <>
              <button className={nav.btn} onClick={() => navigate('/login')}>Login</button>
              <button className={nav.btn} onClick={() => navigate('/signup')}>Signup</button>
            </>

        }
      </div>
    </div>
  )
}

export default Navbar
