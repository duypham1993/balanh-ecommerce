import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Orders from "./pages/Orders/Orders";
import ProductList from "./pages/Products/ProductList";
import Categories from "./pages/Categories/Categories";
import Customer from "./pages/Customer/Customer";
import Admins from "./pages/Admins/Admins";
import AddProduct from './pages/Products/AddProduct/AddProduct';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar/Sidebar';
import CreateCategory from './pages/Categories/CreateCategory/CreateCategory';
import UpdateCategory from './pages/Categories/UpdateCategory/UpdateCategory';
import Origin from './pages/Origin/Origin';

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  console.log(currentUser);
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
      </Routes>
      {currentUser &&
        <Box className="flex-bw-center">
          <Sidebar />
          <Box component="main" className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<ProductList />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="categories" element={<Categories />} />
              <Route path="categories/create" element={<CreateCategory />} />
              <Route path="categories/:id"
                element={<UpdateCategory />} />
              <Route path='origin' element={<Origin />} />
              <Route path="customer" element={<Customer />} />
              <Route path="admins" element={<Admins />} />
            </Routes>
          </Box>
        </Box>
      }
    </>
  );
}

export default App;
