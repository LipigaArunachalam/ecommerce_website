import React, { useState } from 'react'
import  './LoginForm.css'
import { FaUser, FaLock } from 'react-icons/fa'

const LoginForm = ({ onSignUpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpClick = (e) => {
        e.preventDefault();
        onSignUpClick();
    }

  return (
    <div className="wrapper">
      <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="email" placeholder="Email " value={email} onChange={(e) => setEmail(e.target.value)} />
                < FaUser className="icon"/>
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                < FaLock className="icon"/>
            </div>
            <div className="remember-forget">
                <label><input type="checkbox"/>Remember me</label>
                <a href="#">Forget Password?</a>
            </div>
            <button type="submit">Login</button>
            <div className ="register-link">
                <p>Don't have an account<a href="" onClick={handleSignUpClick}>Sign Up</a></p>
            </div>
      </form>
      {console.log(email, password)}
    </div>
  )
}

export default LoginForm
