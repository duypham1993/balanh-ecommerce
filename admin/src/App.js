import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      {currentUser &&
        <>
          <Route pat="/" element={<Home />} />
        </>
      }
    </Routes>
  );
}

export default App;
