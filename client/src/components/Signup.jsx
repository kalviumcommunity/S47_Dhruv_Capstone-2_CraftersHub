import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
const Signup = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const onSignupBtn =(e)=>{
        e.preventDefault()
        console.log(name , password, email);
        axios.post('http://localhost:9000/signup',{
            name,
            username: email,
            password
        }).then(res=>{
            console.log(res);
        }).catch((error)=>{
            console.log(error);
        })
    }
  return (
    <div>
         <h1>SignUp</h1>
      <form onSubmit={(e)=>onSignupBtn(e)}>
        <div>
            <label htmlFor="name">Name:- </label>
            <input type="text" name="name" id="name" placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="username">Email:- </label>
            <input type="email" name="username" required id="usename" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password:- </label>
            <input type="text" name="password" required id="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <button type='submit'>SignUp</button>
      </form>

    </div>
  )
}

export default Signup
