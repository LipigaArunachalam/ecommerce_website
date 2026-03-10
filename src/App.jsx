
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import LoginForm from './Components/pages/auth/LoginForm'
// import SignUpForm from  './Components/pages/auth/SignUpForm'
// import ForgotPassword from './Components/pages/auth/ForgotPassword'
// import ResetPassword from './Components/pages/auth/resetPassword'
import AdminDashboard from './Components/pages/admin/Dashboard'
import { AdminLayout } from './Components/pages/admin/AdminLayout';
// import Products from './Components/pages/admin/Products';
import Customers from './Components/pages/admin/Customer';
import Sellers from './Components/pages/admin/seller';
import Orders from './Components/pages/admin/Order';

function App() {

  return (
    <BrowserRouter>
      <Routes>

{/* 
        <Route path="/" element={<LoginForm />} />

        <Route path="/signup" element={<SignUpForm />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} /> */}

        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<Customers />} />
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="sellers" element={<Sellers />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App
