import "./login.scss";
import logo from "../../assets/imgs/logo.png";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
import { login } from "../../redux/slice/authSlice";
import { useFormik } from "formik";
import { VALIDATE_FORM_LOGIN } from "../../shared/constants";

const Login = () => {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const dispatch = useDispatch();

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validationSchema: VALIDATE_FORM_LOGIN,
    onSubmit: (values, { setSubmitting }) => {
      const user = {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe
      }
      dispatch(login(user))
        .unwrap()
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((error) => {

        })
    }
  })

  return (
    <div className="login-page">
      <div className="login-page__container">
        <figure className="login-page__logo">
          <img src={logo} alt="balanh" />
        </figure>
        <Box component="form" className="login-form" onSubmit={formLogin.handleSubmit}>
          <h3 className='login-form__title'>Ba Lành - Trở về với tự nhiên</h3>
          <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type='text'
              value={formLogin.values.email}
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}
              label="Email"
              name="email"
            />
            <p className={formLogin.errors.email ? "login-form__error show" : "login-form__error"}>{formLogin.errors.email}</p>
          </FormControl>
          <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPw ? 'text' : 'password'}
              value={formLogin.values.password}
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}
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
            <p className={formLogin.errors.password ? "login-form__error show" : "login-form__error"}>{formLogin.errors.password}</p>
          </FormControl>
          <Button variant="contained" type="submit" className='login-form__button'>Đăng nhập</Button>
          <div className="flex-bw-center">
            <div>
              <FormControlLabel control={<Checkbox name="rememberMe" checked={formLogin.values.rememberMe} onChange={formLogin.handleChange} />} label="Duy trì đăng nhập" />
            </div>
            <div>
              <Link to="#" className="link-default">Bạn quên mật khẩu?</Link>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Login