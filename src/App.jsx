import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from './Components/pages/auth/LoginForm'
import SignUpForm from  './Components/pages/auth/SignUpForm'
import ForgotPassword from './Components/pages/auth/ForgotPassword'
import ResetPassword from './Components/pages/auth/resetPassword'
import SellerProfile from './Components/pages/seller/sellerProfile'
import Products from './Components/pages/seller/products'
import AddProduct from './Components/pages/seller/adddProduct'


function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/seller-profile" element={<SellerProfile/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App
