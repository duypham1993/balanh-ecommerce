import "./login.scss";
import logo from "../../assets/imgs/logo.png";
import { useState } from 'react';
import { login } from '../../redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleOnClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <>
      {currentUser &&
        <Navigate to="/" replace={true} />
      }
      <div className="login-page">
        <div className="login-page__container">
          <figure className="login-page__logo">
            <img src={logo} alt="balanh" />
          </figure>
          <Box component="form" className="login-page__form">
            <h3 className='login-page__title'>Ba Lành - Trở về với tự nhiên</h3>
            <FormControl sx={{ mb: 2, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                name="email"
              />
            </FormControl>
            <FormControl sx={{ mb: 3, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPw(!showPw)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPw ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" type="submit" className='login-page__button' onClick={(e) => handleOnClick(e)}>Đăng nhập</Button>
            <div className="flex-bw-center">
              <div>
                <FormControlLabel control={<Checkbox name="remember-login" />} label="Duy trì đăng nhập" />
              </div>
              <div>
                <Link to="/forgot-password" className="link-default">Bạn quên mật khẩu?</Link>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login