import { useEffect, useState } from "react";
import "./login.scss";
import { Modal, Dropdown } from 'react-bootstrap';
import LoginIcon from '@mui/icons-material/Login';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle, logout, syncCurrentUser } from "../../../../redux/slice/authSlice";
import { getLocalAccessToken, getLocalCurrentUser } from "../../../../utils/localStorage";
import FormLogin from "../../../FormLogin/FormLogin";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const localUser = getLocalCurrentUser();
  const localAccessToken = getLocalAccessToken();
  const currentUser = useSelector(state => state.auth.currentUser);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const syncLocalstage = () => {
      dispatch(syncCurrentUser(getLocalCurrentUser()));
    }
    window.addEventListener('storage', syncLocalstage);
    return () => {
      window.removeEventListener('storage', syncLocalstage);
    }
  }, [])

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    validationSchema: yup.object({
      email: yup.string()
        .email('Email không hợp lệ!')
        .required(true),
      password: yup.string()
        .min(8, true)
        .required(true),
      rememberMe: yup.boolean()
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          setShow(false);
          setSubmitting(false);
        })
        .catch((error) => {
          formLogin.errors.password = error.password;
          formLogin.errors.email = error.email;
          setSubmitting(false);
        })
    }
  })

  const handleLogout = () => {
    dispatch(logout());
  }

  const loginGoogle = (w, h) => {
    dispatch(loginWithGoogle(w, h))
      .unwrap()
      .then((data) => {
        const y = window.top.outerHeight / 2 + window.top.screenY - (h / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - (w / 2);
        window.open(data.url, "_blank", `width=${w}, height=${h}, top=${y}, left=${x}`);
      })
  }

  return (
    <>
      <div className="text-end login">
        {Object.keys(currentUser).length || (localUser && localAccessToken) ?
          // Logged in
          <div className="d-flex align-items-center justify-content-end">
            <div className="fs-85 link-df link-df--white me-2" onClick={() => handleLogout()}>
              <LogoutIcon className="fs-6" />
              <span className="ps-1" >Đăng Xuất</span>
            </div>
            <Link to="/profile" className="fs-85 link-df link-df--white d-inline-flex align-items-center">
              <PersonIcon className="fs-6" />
              <span className="ps-1">{localUser.name}</span>
            </Link>
          </div>
          :
          // Login 
          <div className="custom-dropdown">
            <Dropdown>
              <Dropdown.Toggle className="link-df link-df--white border-0 fs-6 login__toggle">
                <LoginIcon className="fs-6" />
                <span className="ps-1">Tài khoản của bạn</span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="p-3">
                <Dropdown.Item onClick={handleShow} className="btn-df btn-df--green fw-bold fs-85">
                  <span>ĐĂNG NHẬP</span>
                </Dropdown.Item>
                <Dropdown.Item className="link-df link-df--gray my-1 px-3" as={"div"}>
                  <Link to="/forgot-password" className=" link-df link-df--gray">
                    <span>Quên mật khẩu?</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="link-df link-df--gray my-1 px-3" as={"div"}>
                  <Link to="/register" className="link-df link-df--gray">
                    <span>ĐĂNG KÍ TÀI KHOẢN</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-tems-center custom-button__face-login my-1">
                  <FacebookIcon className="fs-5 me-1" />
                  <span>Đăng nhập</span>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center custom-button__google-login my-1" as={"div"} onClick={() => loginGoogle(500, 600)}>
                  <GoogleIcon className="fs-5 me-1" />
                  <span>Đăng nhập</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        }
      </div>
      <Modal show={show} onHide={handleClose} className="login-modal" centered>
        <Modal.Header className="text-center border-0 pt-4 pb-0 px-5">
          <Modal.Title className="w-100 border-bottom pb-3">
            <PersonIcon className="fs-1" />
            <p className="fs-5">ĐĂNG NHẬP</p>
          </Modal.Title>
          <button className="position-absolute top-0 end-0 border-0 text-white bg-black p-2" onClick={handleClose}>
            <CloseIcon className="fs-3" />
          </button>
        </Modal.Header>
        <Modal.Body className="py-4 px-5">
          <FormLogin formik={formLogin} />
        </Modal.Body>
        <Modal.Footer className="py-4 px-5 d-block text-center bg-gray">
          <div className="m-0 mb-3">
            <Link to="#" className="link-df link-df--gray">BẠN QUÊN MẬT KHẨU?</Link>
          </div>
          <p className="m-0 mb-3">BẠN CHƯA CÓ TÀI KHOẢN?</p>
          <Link to="/register" className="link-df fs-85 px-3 mb-3 py-2 login-modal__register" onClick={handleClose}>ẤN VÀO ĐÂY ĐỂ TẠO MỚI</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login;