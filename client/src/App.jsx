import React from 'react'
import './App.css'
import Form from './components/Form'
import Home from './components/Home'
import {Routes , Route} from 'react-router-dom'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/form' element={<Form/>}></Route>
    </Routes>
      
    </>
  )
}

export default App
