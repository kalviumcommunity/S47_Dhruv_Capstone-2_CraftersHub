import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userdata,setData] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onLoginBtn = (e) => {
    setError('')
    e.preventDefault()
    console.log(email, password);
    axios.post('http://localhost:9000/login', {
      username: email,
      password
    }).then(res => {
      console.log("res",res);
      // navigate('/product')

    }).catch(err => {
      console.log(err);
      setError(err)
    })
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:9000/login/success', { withCredentials: true })
        console.log("response", response);
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser()
  }, [])


  const googlePage = () => {
    window.open("http://localhost:9000/auth/google/callback", "_self")
  }
  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onLoginBtn(e)}>
        <div>
          <label htmlFor="username">Email:- </label>
          <input type="email" name="username" required id="usename" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:- </label>
          <input type="text" name="password" required id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate('/forgetPassword')}>Forget password?</p>
        <button type='submit'>Login</button>
      </form>
      <p>Or</p>
      <button onClick={googlePage}>Continue with google</button>
    </div>
  )
}

export default Login
