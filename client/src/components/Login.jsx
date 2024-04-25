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
    <div className={login.body}>
      <div className={login.imgdiv}>
        <img src={loginimg} alt="login image" className={login.img} />
      </div>
      <div className={login.right}>
        <Person2
          color='primary'
          sx={{ fontSize: 80 }}
          className={login.loginicon}
        />
        <h2 className={login.heading}>Login</h2>
        <form onSubmit={(e) => onLoginBtn(e)} className={login.form}>
          <div className={login.inputdiv}>
            <TextField
              className={login.input}
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
          <div className={login.inputdiv2}>
            <TextField
              className={login.input}
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
            <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/forgetPassword')} className={login.forgetPassword}>Forget password?</p>
          </div>
          <Button
            className={login.loginbtn}
            endIcon={<LoginIcon />}
            variant="contained"
            size='large'
            type='submit'
          >Login</Button>
        </form>
        <div className={login.or}>
          <hr className={login.hr}/>
          <span >Or</span>
          <hr className={login.hr} />
        </div>
        <Button
          variant='contained'
          color='primary'
          size='large'
          startIcon={<Google />}
          onClick={googlePage}
        >Continue with google</Button>
        <p className={login.navigations}>Not have an account? <Link to={'/signup'} className={login.signupbtn}>Signup</Link></p>
      </div>

    </div>
  )
}

export default Login
