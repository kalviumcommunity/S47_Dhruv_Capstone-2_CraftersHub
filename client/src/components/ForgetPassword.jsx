import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const onSendbtn = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:9000/forgotPassword',{username:email})
        .then((res) => {
            console.log(res)
            navigate('/login')
        })
        .catch(err=> console.log(err))
    }
    console.log(email);
    return (
        <div>
            <h1>Forget Password</h1>
            <form onSubmit={(e)=>onSendbtn(e)}>
                <div>
                    <label htmlFor="email">Email:-</label>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} placeholder='Enter your register email'/>
                </div>
                <button >Send</button>
            </form>
        </div>
    )
}

export default ForgetPassword
