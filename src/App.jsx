
import './App.css'
import LoginForm from './Components/LoginForm/LoginForm'
import SignUpForm from  './Components/SignUpForm/SIgnUpForm'
import { useState } from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      {isLogin ? (
        <LoginForm onSignUpClick={() => setIsLogin(false)} />
      ) : (
        <SignUpForm onLoginClick={() => setIsLogin(true)} />
      )}
    </>
  )
}

export default App
