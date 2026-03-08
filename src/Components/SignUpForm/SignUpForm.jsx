import React, { useState } from 'react'
import './SignUpForm.css'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

const SignUpForm = ({ onLoginClick }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleLoginClick =(e) =>{
        e.preventDefault();
        onLoginClick();
    }

  return (
    <div className="wrapper">
      <form action="">
        <h1>Sign Up</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FaEnvelope className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <FaLock className="icon" />
        </div>
        <button type="submit">Sign Up</button>
        <div className="login-link">
          <p>Already have an account? <a href="#" onClick={handleLoginClick}>Login</a></p>
        </div>
      </form>
      {console.log(username, email, password, confirmPassword)}
    </div>
  )
}

export default SignUpForm
