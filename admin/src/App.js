import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Orders from "./pages/Orders/Orders";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Customer from "./pages/Customer/Customers";
import Admins from "./pages/Admins/Admins";
import AddProduct from './pages/Products/CreateProduct/CreateProduct';
import CreateCategory from './pages/Categories/CreateCategory/CreateCategory';
import UpdateCategory from './pages/Categories/UpdateCategory/UpdateCategory';
import Origin from './pages/Origin/Origin';
import Suppliers from './pages/Suppliers/Suppliers';
import CreateSupplier from './pages/Suppliers/CreateSupplier/CreateSupplier';
import UpdateSupplier from './pages/Suppliers/UpdateSupplier/UpdateSupplier';
import UpdateProduct from './pages/Products/UpdateProduct/UpdateProduct';
import Layout from './pages/Layout/Layout';
import CreateAdmin from './pages/Admins/CreateAdmin/CreateAdmin';
import UpdateAdmin from './pages/Admins/UpdateAdmin/UpdateAdmin';
import CreateCustomer from './pages/Customer/CreateCustomer/CreateCustomer';
import UpdateCustomer from './pages/Customer/UpdateCustomer/UpdateCustomer';
import AddressList from './pages/DeliveryInfo/AddressList';
import CreateAddress from './pages/DeliveryInfo/CreateAddress/CreateAddress';
import UpdateAddress from './pages/DeliveryInfo/UpdateAddress/UpdateAddress';
import Profile from './pages/Profile/Profile';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';

function App() {
  return (

    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<ProtectRoute />}>
        <Route element={<Layout />}>
          <Route path='profile' element={<Profile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="products/create" element={<AddProduct />} />
          <Route path="products/:id" element={<UpdateProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/create" element={<CreateCategory />} />
          <Route path="categories/:id"
            element={<UpdateCategory />} />
          <Route path='origin' element={<Origin />} />
          <Route path='suppliers' element={<Suppliers />} />
          <Route path='suppliers/create' element={<CreateSupplier />} />
          <Route path='suppliers/:id' element={<UpdateSupplier />} />
          <Route path="customers" element={<Customer />} />
          <Route path="customers/create" element={<CreateCustomer />} />
          <Route path="customers/:id" element={<UpdateCustomer />} />
          <Route path="delivery-info" element={<AddressList />} />
          <Route path="delivery-info/create" element={<CreateAddress />} />
          <Route path="delivery-info/:id" element={<UpdateAddress />} />
          <Route path="admins" element={<Admins />} />
          <Route path='admins/create' element={<CreateAdmin />} />
          <Route path='admins/:id' element={<UpdateAdmin />} />
          <Route index element={<Home />} />
        </Route>
      </Route>
    </Routes>

  );
}

export default App;
