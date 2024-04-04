import React from 'react'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Form from './components/Form'
import Product from './components/Product'
import Home from './components/Home'
import Profile from './components/Profile'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/form' element={<Form/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
