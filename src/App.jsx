import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './Components/pages/admin/Dashboard'
import { AdminLayout } from './Components/pages/admin/AdminLayout';
import Customers from './Components/pages/admin/Customer';
import Sellers from './Components/pages/admin/seller';
import Orders from './Components/pages/admin/Order';
import LoginForm from './Components/pages/auth/LoginForm'
import SignUpForm from  './Components/pages/auth/SignUpForm'
import ForgotPassword from './Components/pages/auth/ForgotPassword'
import ResetPassword from './Components/pages/auth/resetPassword'
import SellerProfile from './Components/pages/seller/sellerProfile'
import Products from './Components/pages/seller/products'
import AddProduct from './Components/pages/seller/adddProduct'
import OrderStatus from './Components/pages/seller/orderStatus'


function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 

        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<Customers />} />
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="sellers" element={<Sellers />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        <Route path="/seller-profile" element={<SellerProfile/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/order-status" element={<OrderStatus/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App
