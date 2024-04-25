import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import login from '../css/login.module.css'
import loginimg from '../assets/login.jpg'
//Material Ui components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import { Google, Email, LockOpen, Person2 } from '@mui/icons-material'
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const onLoginBtn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:9000/login', {
        username: email,
        password
      })
      console.log(response);
      localStorage.setItem("id", response.data.user._id)
      navigate('/')
    } catch (error) {
      console.log("login error", error);
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem('id')

        const response = await axios.get('http://localhost:9000/login/success', (!id) ? { withCredentials: true } : {
          headers: {
            'Authorization': `Bearer ${id}`,
          }
        })
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
    <div className= "flex">
      <div className={login.imgdiv}>
        <img src={loginimg} alt="login image" className={login.img} />
      </div>
      <div 
      className="flex flex-col w-40vw items-center justify-center text-center ml-10"
      >
        <Person2
          color='primary'
          sx={{ fontSize: 80 }}
          className="mx-auto"
        />
        <h2 className="text-5xl font-light mt-1 mb-10">Login</h2>
        <form onSubmit={(e) => onLoginBtn(e)} className="flex flex-col items-center">
          <div className='h-20'>
            <TextField
              className="w-80"
              type="email"
              name="username"
              required
              placeholder='Enter your email'
              label="Email Address"
              variant="outlined"
              size='medium'
              color='primary'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email color='primary' />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div >
            <TextField
              className="w-80"
              type="password"
              name="password"
              required
              variant="outlined"
              size='medium'
              color='primary'
              label="Password"
              placeholder='Enter your password'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LockOpen color='primary' />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setPassword(e.target.value)} />
            <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/forgetPassword')} className="text-1xl mb-6 ml-48">Forget password?</p>
          </div>
          <Button
            className={login.loginbtn}
            endIcon={<LoginIcon />}
            variant="contained"
            size='large'
            type='submit'
          >Login</Button>
        </form>
        <div className="flex text-2xl m-2.5">
          <hr className="h-1 w-44 m-4 bg-slate-300"/>
          <span >Or</span>
          <hr />
          <hr className="h-1 w-44 m-4 bg-slate-300" />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          startIcon={<Google />}
          onClick={googlePage}
        >Continue with google</Button>
        <p className="text-1xl mt-2">Not have an account? <Link to={'/signup'} className={login.signupbtn}>Signup</Link></p>
      </div>

    </div>
  )
}

export default Login
