import { Offcanvas, Navbar, Tab, Nav, Collapse } from 'react-bootstrap';
import MenuItemMobile from './MenuItemMobile/MenuItemMobile';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "../../../../redux/slice/categorySlice";
import logo from "../../../../assets/imgs/logo.webp";
import "./menu-mobile.scss";
import FormLogin from '../../../FormLogin/FormLogin';
import { useFormik } from "formik";
import * as yup from "yup";
import { login, logout } from '../../../../redux/slice/authSlice';
import { Link } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { getLocalAccessToken, getLocalCurrentUser } from '../../../../utils/localStorage';

const MenuMobile = ({ expand }) => {
  const dispatch = useDispatch();
  const treeCategories = useSelector(state => state.category.treeCategories);
  const currentUser = useSelector(state => state.auth.currentUser);
  const localUser = getLocalCurrentUser();
  const localToken = getLocalAccessToken();
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  }

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
        .required(true)
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          setShow(false);
        })
        .catch((error) => {
          formLogin.errors.password = error.password;
          formLogin.errors.email = error.email;
          setSubmitting(false);
        })
    }
  });

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        setShow(false);
      })
  }

  return (
    <div className="menu-mobile">
      <Navbar.Toggle className="shadow-none rounded-0" onClick={handleShow} />
      <Navbar.Offcanvas
        placement="end"
        show={show}
        onHide={handleClose}
        className="menu-mobile">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-uppercase">
            <div className='w-50'>
              <img src={logo} alt="Ba lành" className='w-100' />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Tab.Container
            defaultActiveKey="menu"
            justify
          >
            <Nav className='mb-3 flex-row'>
              <Nav.Item className='col-6'>
                <Nav.Link eventKey="menu" className='text-center text-uppercase border border-start-0'>Menu</Nav.Link>
              </Nav.Item>
              <Nav.Item className='col-6'>
                <Nav.Link eventKey="profile" className='text-center text-uppercase border border-start-0 border-end-0'>Tài khoản</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="menu">
                <ul className="list-unstyled p-0 bg-green">
                  {treeCategories.map((item, index) => {
                    return (
                      <MenuItemMobile
                        item={item}
                        key={index}
                        handleClose={handleClose}
                      />
                    );
                  })}
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="profile" className='px-4'>
                {Object.keys(currentUser).length || localUser && localToken ?
                  <Nav>
                    <Nav.Item className='mb-3'>
                      <Link to="/profile" className='link-df link-df--gray' onClick={handleClose}>
                        <ManageAccountsIcon />
                        <span>Thông tin tài khoản</span>
                      </Link>
                    </Nav.Item>
                    <Nav.Item className='mb-3'>
                      <p onClick={() => handleLogout()}>
                        <LogoutIcon />
                        <span>Đăng xuất</span>
                      </p>
                    </Nav.Item>
                  </Nav>
                  :
                  <Nav >
                    <Nav.Item className='mb-3'>
                      <Link to="/register" className='link-df link-df--gray d-flex align-items-center text-capitalize' onClick={handleClose}>
                        <KeyIcon />
                        <span className='ps-1'>Đăng ký tài khoản</span>
                      </Link>
                    </Nav.Item>
                    <Nav.Item>
                      <p
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                        className="d-flex align-items-center text-capitalize justify-content-between mb-3"
                      >
                        <span>
                          <LoginIcon />
                          <span className='ps-1'>Đăng nhập</span>
                        </span>
                        <KeyboardArrowLeftIcon className={open ? "trans3s rotate90" : "trans3s"} />

                      </p>
                      <Collapse in={open}>
                        <div id="example-collapse-text">
                          <FormLogin formik={formLogin} />
                        </div>
                      </Collapse>
                    </Nav.Item>
                  </Nav>
                }
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </div>
  );
};

export default MenuMobile;