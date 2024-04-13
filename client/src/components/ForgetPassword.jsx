import React, { useState } from 'react'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    return (
        <div>
            <h1>Forget Password</h1>
            <form>
                <div>
                    <label htmlFor="email">Email:-</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your register email'/>
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}

export default ForgetPassword
