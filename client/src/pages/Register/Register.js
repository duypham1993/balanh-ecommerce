import { Container, Row, Col, FloatingLabel, Form, Spinner, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useDispatch } from "react-redux";
import { register } from "../../redux/slice/authSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";

const Register = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const autoClose = setTimeout(handleClose, 3000);
    return () => clearTimeout(autoClose);
  }, [show]);

  const handleClose = () => setShow(false);
  const formRegister = useFormik({
    initialValues: {
      gender: 'male',
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      name: yup.string()
        .required(true),
      email: yup.string()
        .email("Email không hợp lệ!")
        .required(true),
      password: yup.string()
        .min(8, "Mật khẩu không được ít hơn 8 kí tự!")
        .required(true),
      confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp!")
        .required(true)
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const user = {
        gender: values.gender,
        name: values.name,
        email: values.email,
        password: values.password
      }

      dispatch(register(user))
        .unwrap()
        .then(() => {
          setShow(true);
          resetForm();
          setSubmitting(false);
        })
        .catch((error) => {
          formRegister.errors.email = error.email;
          setSubmitting(false);
        })
    }
  })
  return (
    <main className="register-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={5}>
            <Form className="py-4 px-3 p-md-5 bg-white" onSubmit={formRegister.handleSubmit}>
              <div className="mb-3">
                <h5 className="mb-2 fs-6">Giới tính</h5>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={"male" === formRegister.values.gender}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                  <label htmlFor="male" className="me-3 ms-1">Nam</label>

                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={"female" === formRegister.values.gender}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                  <label htmlFor="female" className="me-3 ms-1">Nữ</label>

                  <input
                    type="radio"
                    id="other"
                    name="gender"
                    value="other"
                    checked={"other" === formRegister.values.gender}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                  />
                  <label htmlFor="other" className="me-3 ms-1">Khác</label>
                </div>
              </div>
              <div className="mb-3">
                <FloatingLabel label="Họ và tên" className={formRegister.touched.name && formRegister.errors.name && "text-red"}>
                  <Form.Control
                    type="text"
                    placeholder="Họ và tên"
                    name="name"
                    className={formRegister.touched.name && formRegister.errors.name ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    value={formRegister.values.name}
                  />
                </FloatingLabel>
              </div>
              <div className="mb-3">
                <FloatingLabel label="Email" className={formRegister.touched.email && formRegister.errors.email && "text-red"}>
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    name="email"
                    className={formRegister.touched.email && formRegister.errors.email ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    value={formRegister.values.email}
                  />
                </FloatingLabel>
                {formRegister.touched.email && formRegister.errors.email && <p className="text-red fs-85">{formRegister.errors.email}</p>}
              </div>
              <div className="mb-3">
                <FloatingLabel label="Mật khẩu" className={formRegister.touched.password && formRegister.errors.password && "text-red"}>
                  <Form.Control
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    className={formRegister.touched.password && formRegister.errors.password ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    value={formRegister.values.password}
                  />
                </FloatingLabel>
                {formRegister.touched.password && formRegister.errors.password && <p className="text-red fs-85">{formRegister.errors.password}</p>}
              </div>
              <div className="mb-4">
                <FloatingLabel label="Xác nhận mật khẩu" className={formRegister.touched.confirmPassword && formRegister.errors.confirmPassword && "text-red"}>
                  <Form.Control
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    name="confirmPassword"
                    className={formRegister.touched.confirmPassword && formRegister.errors.confirmPassword ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                    onChange={formRegister.handleChange}
                    onBlur={formRegister.handleBlur}
                    value={formRegister.values.confirmPassword}
                  />
                </FloatingLabel>
                {formRegister.touched.confirmPassword && formRegister.errors.confirmPassword && <p className="text-red fs-85">{formRegister.errors.confirmPassword}</p>}
              </div>
              {formRegister.isSubmitting ?
                <button disabled className="btn-df btn-df--green btn-spinner w-100 cursor-wait" type="submit">
                  <Spinner animation="border" variant="light" className="spinner" size="sm" />
                </button>
                :
                <button className="btn-df btn-df--green w-100" type="submit">ĐĂNG KÍ</button>
              }
            </Form>
            <Modal show={show} onHide={handleClose} centered className="custom-notification">
              <Modal.Body className="text-center text-green">
                <CheckCircleIcon className="fs-1" />
                <p className="mt-2 fs-5">Đăng kí tài khoản thành công. Vui lòng kiểm tra email của bạn để kích hoạt tài khoản!</p>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Register;