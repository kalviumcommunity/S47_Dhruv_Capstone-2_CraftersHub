import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate,Link} from 'react-router-dom'
const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpGenerated, setOtpGenterated] = useState(false)
  const [confirmPassword,setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const [validOtp,setValidOTP] = useState('')

  const onSignupBtn = (e) => {
    e.preventDefault()
    if(otpGenerated){
    console.log(name, password, email);
    if(password == confirmPassword){
      axios.post('http://localhost:9000/signup', {
        name,
        username: email,
        password,
        otp,
        validOtp
      }).then(res => {
        console.log(res);
        localStorage.setItem("id",res.data._id)
        navigate('/')
      }).catch((error) => {
        console.log(error);
        alert(error.response.data)
      })
    }else{
      alert('Password not match')
    }
  }else{
      alert('Please generate OTP')
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        let headers = {withCredentials:true}
        const id = localStorage.getItem('id') 

        if(id){
          headers['Authorization'] = `Bearer ${id}`
        }
        const response = await axios.get('http://localhost:9000/login/success', { headers })
        console.log("response", response);
        navigate('/')
      } catch (error) {
        console.log(error);
        // navigate('/error')
      }
    }
    fetchUser()
  }, [])

  const generateOtp = () => {
    setValidOTP('')
    if (email) {
      axios.post('http://localhost:9000/otpVerification',{email})
      .then(res=>{
        setValidOTP(res.data.validOTP)
        setOtpGenterated(true)
        alert('OTP sent to your email')
      }).catch(err=>{
        console.log(err);
      })
    }
  }
  console.log(validOtp);
  const googlesignuup = () => {
    window.open("http://localhost:9000/auth/google/callback", "_self")
  }
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={(e) => onSignupBtn(e)}>
        <div>
          <label htmlFor="name">Name:- </label>
          <input type="text" name="name" id="name" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="username">Email:- </label>
          <input type="email" name="username" required id="usename" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => generateOtp()}>Generate OTP</button>
        </div>

        <div>
          <label htmlFor="password">Password:- </label>
          <input type="password" name="password" required id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="confirmpassword">Confirm password:- </label>
          <input type="password" name="confrmpassword" required id="confirmpassword" placeholder='Enter confirm password' onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {otpGenerated &&
          <div>
            <label htmlFor="otp">OTP:-</label>
            <input type="text" name='otp' required placeholder='Please Enter a OTP' onChange={(e) => setOtp(e.target.value)} />
          </div>}
        <button type='submit'>SignUp</button>
      </form>
      <h1>or</h1>
      <p>Not have an account? <Link to={'/login'}>Login</Link></p>
      <button onClick={googlesignuup}>Continue wth google</button>
    </div>
  )
}

export default Signup
