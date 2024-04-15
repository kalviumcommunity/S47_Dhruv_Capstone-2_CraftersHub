import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' 
import axios from 'axios'
const ResetPassword = () => {
    const {id,token} = useParams()
    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
const navigate = useNavigate()
    const OnSubmitBtn = (e)=>{
        e.preventDefault()
        if(password != rePassword){
            return alert("password not match")
        }

        axios.post(`http://localhost:9000/resetPassword/${id}/${token}`,{password})
        .then((res)=>{
            console.log(res);
            navigate('/login')
        }).catch(err=>console.log(err))
    }
    
  return (
    <div>
        <h1>Reset Password</h1>
      <form onSubmit={(e)=>OnSubmitBtn(e)}>
        <div>
            <label htmlFor="Newpassword">New password:- </label>
            <input type="password" name="Newpassword" required  placeholder='Enter a new password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="RePassword">Confirm password:- </label>
            <input type="password" name="RePassword" required  placeholder='Enter a confirm password' onChange={(e)=>setRePassword(e.target.value)}/>
        </div>
        <button type='submit'>Change</button>
      </form>
    </div>
  )
}

export default ResetPassword
