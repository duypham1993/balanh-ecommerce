import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import AddProduct from './pages/Products/CreateProduct/CreateProduct';
import UpdateProduct from './pages/Products/UpdateProduct/UpdateProduct';
import Categories from "./pages/Categories/Categories";
import CreateCategory from './pages/Categories/CreateCategory/CreateCategory';
import UpdateCategory from './pages/Categories/UpdateCategory/UpdateCategory';
import Admins from "./pages/Admins/Admins";
import CreateAdmin from './pages/Admins/CreateAdmin/CreateAdmin';
import UpdateAdmin from './pages/Admins/UpdateAdmin/UpdateAdmin';
import Origin from './pages/Origin/Origin';
import Suppliers from './pages/Suppliers/Suppliers';
import CreateSupplier from './pages/Suppliers/CreateSupplier/CreateSupplier';
import UpdateSupplier from './pages/Suppliers/UpdateSupplier/UpdateSupplier';
import Customer from "./pages/Customer/Customers";
import CreateCustomer from './pages/Customer/CreateCustomer/CreateCustomer';
import UpdateCustomer from './pages/Customer/UpdateCustomer/UpdateCustomer';
import AddressList from './pages/Address/AddressList';
import CreateAddress from './pages/Address/CreateAddress/CreateAddress';
import UpdateAddress from './pages/Address/UpdateAddress/UpdateAddress';
import Stock from './pages/Stock/Stock';
import Profile from './pages/Profile/Profile';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';
import NotFound from './pages/NotFound/NotFound';
import UpdateOrder from './pages/Orders/UpdateOrder/UpdateOrder';

function App() {
  return (

    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<ProtectRoute />}>
        <Route element={<Layout />}>
          <Route path='profile' element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<UpdateOrder />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<AddProduct />} />
          <Route path="products/:id" element={<UpdateProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/:id"
            element={<UpdateCategory />} />
          <Route path='stock' element={<Stock />} />
          <Route path='origin' element={<Origin />} />
          <Route path='suppliers' element={<Suppliers />} />
          <Route path='suppliers/create' element={<CreateSupplier />} />
          <Route path='suppliers/:id' element={<UpdateSupplier />} />
          <Route path="customers" element={<Customer />} />
          <Route path="customers/create" element={<CreateCustomer />} />
          <Route path="customers/:id" element={<UpdateCustomer />} />
          <Route path="addresses" element={<AddressList />} />
          <Route path="addresses/create" element={<CreateAddress />} />
          <Route path="addresses/:id" element={<UpdateAddress />} />
          <Route path="admins" element={<Admins />} />
          <Route path='admins/create' element={<CreateAdmin />} />
          <Route path='admins/:id' element={<UpdateAdmin />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;
