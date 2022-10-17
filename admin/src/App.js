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
import Customer from "./pages/Customer/Customer";
import Admins from "./pages/Admins/Admins";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      {currentUser &&
        <>
          <Route path="/" element={<Home />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customer" element={<Customer />} />
          <Route path="admins" element={<Admins />} />
        </>
      }
    </Routes>
  );
}

export default App;
