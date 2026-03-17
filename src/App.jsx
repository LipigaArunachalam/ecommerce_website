import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from './Components/pages/admin/Dashboard'
import { AdminLayout } from './Components/pages/admin/AdminLayout';
import Customers from './Components/pages/admin/Customer';
import Sellers from './Components/pages/admin/seller';
import AdminProfile from './Components/pages/admin/Profile';
import SellerProfile from './Components/pages/seller/sellerProfile'
import Products from './Components/pages/seller/products'
import OrderStatus from './Components/pages/seller/orderStatus'
import CustomerProfile from './Components/pages/customer/customerProfile'
import SellerLayout from './Components/pages/seller/sellerLayout'
import Logout from './Components/pages/auth/Logout';
import Catalog from './Components/pages/customer/catalog';
import ProtectedRoute from './services/authCheck/protectedRoute';
import CustomerLayout from './Components/pages/customer/customerLayout'
import Cart from './Components/pages/customer/cart';
import Order from './Components/pages/customer/order';
import ThemeProviderWrapper from './theme/themeProvider';
import Login from './Components/pages/auth/login';
import Signup from './Components/pages/auth/signup';
import ForgetPassword from './Components/pages/auth/forgetPass';
import PasswordReset from './Components/pages/auth/passwordReset';
import Search from './Components/pages/customer/search';

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>


          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<AdminDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRole="seller" />}>
            <Route path="/seller" element={<SellerLayout />}>
              <Route path="seller-profile" element={<SellerProfile />} />
              <Route path="products" element={<Products />} />
              <Route path="order-status" element={<OrderStatus />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Route>



          <Route element={<ProtectedRoute allowedRole="customer" />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route path="search" element={<Search />} />
              <Route path="catalog" element={<Catalog />} />
              {/* <Route path="catalog" element={<Catalog />} /> */}
              <Route path="customer-profile" element={<CustomerProfile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Order />} />
              <Route path="logout" element={<Logout />} />
              
            </Route>
          </Route>


          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App
