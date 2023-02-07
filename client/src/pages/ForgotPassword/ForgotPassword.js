import { Container, Spinner, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from 'yup';
import { forgotPassword } from "../../redux/slice/authSlice";
import { useState } from "react";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [isSendLink, setIsSenLink] = useState(false);
  const formReset = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: yup.object({
      email: yup.string()
        .email("Email không hợp lệ!")
        .required(true)
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(forgotPassword({ email: values.email }))
        .unwrap()
        .then(() => {
          setIsSenLink(true);
          setSubmitting(false);
        })
        .catch((error) => {
          if (error) formReset.errors.email = error;
          setSubmitting(false);
        })
    }
  })
  return (
    <div className="forgotpw-page">
      <Container>
        <Container fluid>
          <Row className="justify-content-center">
            {isSendLink ?
              <div className="bg-white p-4 p-md-5 text-center text-uppercase fs-5">Đường dẫn cài đặt lại mật khẩu đã được gửi vào email của bạn!</div> :
              <Col xs={12} md={5}>
                <Form className="bg-white p-4 p-md-5" onSubmit={formReset.handleSubmit}>
                  <p className="text-center mb-3"><em><strong>Vui lòng nhập địa chỉ email bạn đã dùng để đăng ký. Bạn sẽ nhận được một liên kết tạm thời để cài đặt lại mật khẩu của bạn.</strong></em></p>
                  <div className="mb-3">
                    <FloatingLabel
                      label="Email"
                      className={formReset.touched.email && formReset.errors.email && "text-red"}
                    >
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        className={formReset.touched.email && formReset.errors.email ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                        name="email"
                        value={formReset.values.email}
                        onChange={formReset.handleChange}
                        onBlur={formReset.handleBlur}
                      />
                    </FloatingLabel>
                    {formReset.touched.email && formReset.errors.email && <p className="text-red fs-85">{formReset.errors.email}</p>}
                  </div>
                  {formReset.isSubmitting ?
                    <button disabled className="btn-df btn-df--green btn-spinner cursor-wait w-100 text-uppercase" type="submit">
                      <Spinner animation="border" variant="light" className="spinner" size="sm" />
                    </button> :
                    <button className="btn-df btn-df--green w-100 text-uppercase" type="submit">cài đặt lại mật khẩu</button>
                  }
                </Form>
              </Col>
            }
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ForgotPassword;