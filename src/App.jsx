
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './Components/LoginForm/LoginForm'
import SignUpForm from  './Components/SignUpForm/SignUpForm'
import ForgotPassword from './Components/auth/ForgotPassword'
import ResetPassword from './Components/auth/resetPassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginForm />} />

        <Route path="/signup" element={<SignUpForm />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App
