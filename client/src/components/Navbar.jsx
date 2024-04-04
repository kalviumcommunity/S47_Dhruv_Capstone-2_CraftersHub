import React from 'react'
import logo from '../assets/CrafersHubLogo.png'
import nav from '../css/nav.module.css'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className={nav.nav}>
      <div className={nav.title} onClick={()=>navigate('/')}>
        <img src={logo} alt="logo" className={nav.logo} />
        <h1>Crafters Hub</h1>
      </div>
      <div className={nav.opt}>
        <button className={nav.btn} onClick={()=>navigate('/product')} >Products</button>
        <button className={nav.btn} onClick={()=>navigate('/profile')}>Profile</button>
        <button className={nav.btn}>Chats</button>
      </div>
    </div>
  )
}

export default Navbar
