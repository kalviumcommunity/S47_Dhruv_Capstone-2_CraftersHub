import React from 'react'
import './App.css'
import {Routes , Route} from 'react-router-dom'
import Form from './components/Form'
import Product from './components/Product'
import Home from './components/Home'
import Profile from './components/Profile'
import Login from './components/Login'
import Signup from './components/Signup'
import Error from './components/Error'
import EditProfile from './components/EditProfile'
import ProductUpdate from './components/ProductUpdate'
import ForgetPassword from './components/ForgetPassword'
import ResetPassword from './components/ResetPassword'
import BookPage from './components/BookPage'
import Payment from './components/Payment'
import OrderPlaced from './components/OrderPlaced'
import ChatList from './components/ChatList'
import ChatRoom from './components/ChatRoom'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/form' element={<Form/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/error' element={<Error/>}></Route>
      <Route path='/updateProfile/:id' element={<EditProfile/>}></Route>
      <Route path='/updateProduct/:id' element={<ProductUpdate/>}></Route>
      <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
      <Route path='/resetPassword/:id/:token' element={<ResetPassword/>}></Route>
      <Route path='/book/:id' element={<BookPage/>}></Route>
      <Route path='/payment' element={<Payment/>}></Route>
      <Route path='/orderPlaced' element={<OrderPlaced/>}></Route>
      <Route path='/chat' element={<ChatRoom/>}></Route>

    </Routes>
    </>
  )
}

export default App
