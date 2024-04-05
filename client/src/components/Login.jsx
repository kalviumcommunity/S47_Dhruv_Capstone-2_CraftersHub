import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    
    const onLoginBtn = (e)=>{
        e.preventDefault()
        console.log(email,password);
        axios.post('http://localhost:9000/login',{
            username:email,
            password
        }).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err))
    }
  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={(e)=>onLoginBtn(e)}>
        <div>
            <label htmlFor="username">Email:- </label>
            <input type="email" name="username" required id="usename" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password:- </label>
            <input type="text" name="password" required id="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type='submit'>Login</button>
      </form>

    </div>
  )
}

export default Login
