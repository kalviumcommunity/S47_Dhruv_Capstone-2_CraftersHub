import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
// import InputEndAdornment from '@mui/material/InputEndAdornment'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [userdata,setData] = useState([])
  // const [error, setError] = useState('')
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
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onLoginBtn(e)}>
        <div>
          {/* <label htmlFor="username">Email:- </label> */}
          <TextField
            type="email"
            name="username"
            required
            placeholder='Enter your email'
            label="Enter your Email"
            variant="outlined"
            size='small'
            color='primary'
            // endIcon={<EmailIcon color='primary'/>}
            InputEndAdornment={
              <EmailIcon color='primary' />
            }
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          {/* <label htmlFor="password">Password:- </label> */}
          <TextField
           type="password"
            name="password"
             required 
             variant="outlined"
            size='small'
            color='primary'
             label="Enter your password"
              placeholder='Enter your password' 
              onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate('/forgetPassword')}>Forget password?</p>
        <Button
          endIcon={<LoginIcon />}
          variant="contained"
          size='small'
          type='submit'
        >Login</Button>
      </form>
      <p>Or</p>
      <p>Not have an account? <Link to={'/signup'}>Signup</Link></p>
      <Button
        variant='contained'
        color='primary'
        size='small'
        startIcon={<GoogleIcon />}
        onClick={googlePage}
      >Continue with google</Button>
    </div>
  )
}

export default Login
