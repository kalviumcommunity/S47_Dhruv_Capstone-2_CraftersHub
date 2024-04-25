import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import signupImg from '../assets/signup.jpg'
//MUI components
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff, Login, Email, PermIdentity ,Lock,Google} from '@mui/icons-material';
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpGenerated, setOtpGenterated] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [validOtp, setValidOTP] = useState('')

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const onSignupBtn = (e) => {
    e.preventDefault()
    if (otpGenerated) {
      console.log(name, password, email);
      if (password == confirmPassword) {
        axios.post('http://localhost:9000/signup', {
          name,
          username: email,
          password,
          otp,
          validOtp
        }).then(res => {
          console.log(res);
          localStorage.setItem("id", res.data._id)
          navigate('/')
        }).catch((error) => {
          console.log(error);
          alert(error.response.data)
        })
      } else {
        alert('Password not match')
      }
    } else {
      alert('Please generate OTP')
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const id = localStorage.getItem('id')

        const response = await axios.get('http://localhost:9000/login/success', (id) ? {
          headers: {
            'Authorization': `Bearer ${id}`,
          }
        } : { withCredentials: true })
        console.log("response", response);
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser()
  }, [])

  const generateOtp = () => {
    setValidOTP('')
    if (email) {
      axios.post('http://localhost:9000/otpVerification', { email })
        .then(res => {
          setValidOTP(res.data.validOTP)
          setOtpGenterated(true)
          alert('OTP sent to your email')
        }).catch(err => {
          console.log(err);
        })
    }
  }
  console.log(validOtp);
  const googlesignuup = () => {
    window.open("http://localhost:9000/auth/google/callback", "_self")
  }
  return (
    <div className="flex">
      <div className='w-signup_Width flex flex-col w-40vw items-center justify-center text-center ml-10'>

      <Lock
      color='primary'
      sx={{ fontSize: 80 }}
      variant='contained'
      className="mx-auto" 
      />
        <h1 className='text-5xl font-light mt-1 mb-10'>SignUp</h1>
        <form onSubmit={(e) => onSignupBtn(e)}>
          <div>
            <TextField
              type="text"
              name="name"
              id="name"
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
              label='Name'
              variant="outlined"
              size='small'
              color='primary'
              className='h-12 w-80'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PermIdentity color='primary' />
                  </InputAdornment>
                )
              }} />
          </div>
          {/* <div> */}
            <TextField
              type="email"
              name="username"
              required
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              variant="outlined"
              size='small'
              color='primary'
              className='h-12 w-80'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Email color='primary' />
                  </InputAdornment>
                )
              }}
            />
            <br />
            <div className='mb-3'>
            <Button
              variant='contained'
              color='primary'
              size='small'
              // className='mt-6'
              onClick={() => generateOtp()}>Generate OTP</Button>
              </div>
          {/* </div> */}

          <div>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              variant="outlined"
              size="small"
              color="primary"
              className='h-12 w-80'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility color='primary' /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}

            />
          </div>
          <div>
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              name="confrmpassword"
              required
              placeholder='Enter confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Password"
              variant="outlined"
              size="small"
              color="primary"
              className='h-12 w-80'
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                      {showConfirmPassword ? <Visibility color='primary' /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          {otpGenerated &&
            <div>
              <TextField
                type="text"
                name='otp'
                required
                placeholder='Please Enter a OTP'
                onChange={(e) => setOtp(e.target.value)}
                label='Enter OTP'
                variant="outlined"
                size="small"
                color="primary"
                className='h-12 w-80'
              />
            </div>}
          <Button
            type='submit'
            variant="contained"
            size='large'
            endIcon={<Login />}
            className='mx-auto'
          >SignUp</Button>
        </form>

        <div className="flex text-2xl m-2.5">
          <hr className="h-1 w-44 m-4 bg-slate-300" />
        <span>or</span>
            <hr className="h-1 w-44 m-4 bg-slate-300"/>
        </div>

        <Button 
        color='primary'
        size='large'
        variant='contained'
        startIcon={<Google />}
        onClick={googlesignuup}>Continue wth google</Button>
        <p className='text-1xl mt-2'>Not have an account? <Link to={'/login'} className="text-signup">Login</Link></p>
      </div>
      <img src={signupImg} alt="SignUP" className="h-imageHeight w-imageWidth "/>
    </div>
  )
}

export default Signup
