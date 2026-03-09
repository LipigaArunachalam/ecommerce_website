
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './Components/pages/auth/LoginForm'
import SignUpForm from  './Components/pages/auth/SignUpForm'
import ForgotPassword from './Components/pages/auth/ForgotPassword'
import ResetPassword from './Components/pages/auth/resetPassword'

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
