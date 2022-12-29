import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products/Products';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Layout from './pages/Layout/Layout';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import CartPage from './pages/CartPage/CartPage';
import LayoutProfile from './pages/Profile/LayoutProfile';
import Profile from './pages/Profile/Profile/Profile';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Home/Home';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Profile/Oders/Orders';
import Addresses from './pages/Profile/Addresses/Addresses';
import OrderDetail from './pages/Profile/Oders/OrderDetail/OrderDetail';
import SearchPage from './pages/SearchPage/SearchPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Pages */}
        <Route exact path='/' element={<Home />} />
        <Route path=':slug' element={<Products />} />
        <Route path='product/:id' element={<ProductDetail />} />
        <Route path='search' exact element={<SearchPage />} />

        {/* Logged In Can't Access */}
        <Route element={<PublicRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Require Login To Access Pages */}
        <Route element={<ProtectRoute />}>
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route element={<LayoutProfile />}>
            <Route path='profile' element={<Profile />} />
            <Route path='addresses' element={<Addresses />} />
            <Route path='orders' element={<Orders />} />
            <Route path='orders/:id' element={<OrderDetail />} />
          </Route>
        </Route>
        <Route path="page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" replace />} />
      </Route>

    </Routes>
  );
}

export default App;
