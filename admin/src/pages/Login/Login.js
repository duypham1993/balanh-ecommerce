import "./login.scss";
import logo from "../../assets/imgs/logo.png";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import { login, resetErrorValidate } from "../../redux/slice/loginSlice";
import { selectData } from "../../redux/selectors";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [showPw, setShowPw] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector(selectData("login", "currentUser"));
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const errorApi = useSelector(selectData("login", "error"));

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length || localUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser]);

  const handleInputs = (e) => {
    const { value, name } = e.target;

    setInputs({ ...inputs, [name]: value })
    // remove error if target has value
    if (value.trim()) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  }

  const handleOnClick = async (e) => {
    e.preventDefault();
    dispatch(resetErrorValidate())
    setFormErrors(validate(inputs));
    !Object.keys(validate(inputs)).length && await dispatch(login(inputs));
  };

  const validate = (inputs) => {
    const error = {};

    if (!inputs.email.trim()) {
      error.email = "Vui lòng nhập Email!"
    }

    if (!inputs.password.trim()) {
      error.password = "Vui lòng nhập mật khẩu!"
    }

    return error;
  }

  return (
    <div className="login-page">
      <div className="login-page__container">
        <figure className="login-page__logo">
          <img src={logo} alt="balanh" />
        </figure>
        <Box component="form" className="login-form">
          <h3 className='login-form__title'>Ba Lành - Trở về với tự nhiên</h3>
          <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type='text'
              value={inputs.email}
              onChange={(e) => handleInputs(e)}
              label="Email"
              name="email"
            />
            <p className={formErrors.email || errorApi.validate ? "login-form__error show" : "login-form__error"}>{formErrors.email || errorApi.validate}</p>
          </FormControl>
          <FormControl sx={{ mb: 5, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPw ? 'text' : 'password'}
              value={inputs.password}
              onChange={(e) => handleInputs(e)}
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
            <p className={formErrors.password || errorApi.validate ? "login-form__error show" : "login-form__error"}>{formErrors.password || errorApi.validate}</p>
          </FormControl>
          <Button variant="contained" type="submit" className='login-form__button' onClick={(e) => handleOnClick(e)}>Đăng nhập</Button>
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
  );
};

export default Login