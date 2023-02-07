import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import FormLogin from "../../components/FormLogin/FormLogin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
          navigate("/");
        })
        .catch((error) => {
          if (error.password) formLogin.errors.password = error.password;
          if (error.email) formLogin.errors.email = error.email;
          setSubmitting(false);
        })
    }
  });
  return (
    <main className="login-page">
      <Container>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} md={5}>
              <div className="p-5 pb-4 bg-white">
                <FormLogin formik={formLogin} />
              </div>
              <div className="pb-2 bg-white text-center">
                <Link to="/forgot-password" className="link-df link-df--gray">QUÊN MẬT KHẨU</Link>
              </div>
              <div className="pb-4 pb-md-5 bg-white text-center">
                <Link to="/register" className="link-df link-df--gray">
                  ĐĂNG KÍ TÀI KHOẢN
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default Login;