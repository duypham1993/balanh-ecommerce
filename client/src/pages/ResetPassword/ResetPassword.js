import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { checkLinkResetPW, resetPassword } from "../../redux/slice/authSlice";
import * as yup from "yup";
import { Form, FloatingLabel, Spinner, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const { id, token } = useParams();
  const dispatch = useDispatch();
  const [isReset, setIsReset] = useState(false);
  const [isOk, setIsOk] = useState(true);

  useEffect(() => {
    dispatch(checkLinkResetPW({ id: id, token: token }))
      .unwrap()
      .then(() => {
      })
      .catch(() => {
        setIsOk(false);
      })
  }, [id, token]);

  const formReset = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: yup.object({
      password: yup.string()
        .required(true)
        .min(8, "Mật khẩu không được ít hơn 8 kí tự!"),

      confirmPassword: yup.string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp!")
        .required(true)
    }),
    onSubmit: (values, { setSubmitting }) => {
      dispatch(resetPassword({ id: id, token: token, password: values.password }))
        .unwrap()
        .then(() => {
          setIsReset(true);
          setSubmitting(false);
        })
        .catch((error) => {
          setSubmitting(false);
        })
    }
  })
  return (
    <div>
      <Container>
        <Container fluid>
          <Row className="justify-content-center">
            {isOk ?
              isReset ?
                <div className="bg-white p-4 p-md-5 text-center text-uppercase fs-5">Mật khẩu của bạn đã được cài đặt lại thành công!</div> :
                <Col xs={12} md={5}>
                  <Form className="bg-white p-4 p-md-5" onSubmit={formReset.handleSubmit}>
                    <div className="mb-3">
                      <FloatingLabel label="Mật khẩu mới" >
                        <Form.Control
                          type="password"
                          placeholder="Mật khẩu mới"
                          className={formReset.touched.password && formReset.errors.password ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                          name="password"
                          onChange={formReset.handleChange}
                          onBlur={formReset.handleBlur}
                          value={formReset.values.password}
                          autoComplete="off" />
                      </FloatingLabel>
                      {formReset.touched.password && formReset.errors.password && <p className="text-red fs-85">{formReset.errors.password}</p>}
                    </div>
                    <div className="mb-4">
                      <FloatingLabel label="Xác nhận mật khẩu" >
                        <Form.Control
                          type="password"
                          placeholder="Xác nhận mật khẩu"
                          className={formReset.touched.confirmPassword && formReset.errors.confirmPassword ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                          name="confirmPassword"
                          onChange={formReset.handleChange}
                          onBlur={formReset.handleBlur}
                          value={formReset.values.confirmPassword}
                          autoComplete="off" />
                      </FloatingLabel>
                      {formReset.touched.confirmPassword && formReset.errors.confirmPassword && <p className="text-red fs-85">{formReset.errors.confirmPassword}</p>}
                    </div>
                    {formReset.isSubmitting ?
                      <button disabled className="btn-df btn-df--green btn-spinner cursor-wait w-100 text-uppercase" type="submit">
                        <Spinner animation="border" variant="light" className="spinner" size="sm" />
                      </button> :
                      <button className="btn-df btn-df--green w-100 text-uppercase" type="submit">xác nhận</button>
                    }
                  </Form>
                </Col>
              :
              <div className="bg-white p-4 p-md-5 text-center text-uppercase fs-5">Đường dẫn không hợp lệ!</div>
            }
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ResetPassword;