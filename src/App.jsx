import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from './Components/pages/admin/Dashboard'
import { AdminLayout } from './Components/pages/admin/AdminLayout';
import Customers from './Components/pages/admin/Customer';
import Sellers from './Components/pages/admin/seller';
import AdminProfile from './Components/pages/admin/Profile';
import LoginForm from './Components/pages/auth/LoginForm'
import SignUpForm from './Components/pages/auth/SignUpForm'
import ForgotPassword from './Components/pages/auth/ForgotPassword'
import ResetPassword from './Components/pages/auth/resetPassword'
import SellerProfile from './Components/pages/seller/sellerProfile'
import Products from './Components/pages/seller/products'
import OrderStatus from './Components/pages/seller/orderStatus'
import CustomerProfile from './Components/pages/customer/customerProfile'
import SellerLayout from './Components/pages/seller/sellerLayout'
import ProtectedRoute from './services/authCheck/protectedRoute';
import Logout from './Components/pages/auth/Logout';
import Catalog from './Components/pages/customer/catalog';


function App() {

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="sellers" element={<Sellers />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Route>

      <Route element={<ProtectedRoute allowedRole="seller"/>}>
      <Route path="/" element={<SellerLayout />}>
        <Route path="/seller-layout" element={<SellerLayout/>}/>
        <Route path="/seller-profile" element={<SellerProfile/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/order-status" element={<OrderStatus/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Route>
      </Route>


       <Route path="/customer-profile" element={<CustomerProfile/>}/>
       <Route path="/catalog" element={<Catalog/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App
