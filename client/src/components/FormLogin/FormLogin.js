import { Form, FloatingLabel, Spinner } from "react-bootstrap";

const FormLogin = ({ formik }) => {
  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <FloatingLabel
          label="Email"
          className={formik.touched.email && formik.errors.email && "text-red"}
        >
          <Form.Control
            type="text"
            placeholder="Email"
            className={formik.touched.email && formik.errors.email ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FloatingLabel>
        {formik.touched.email && formik.errors.email && <p className="text-red fs-85">{formik.errors.email}</p>}
      </div>
      <div className="mb-3">
        <FloatingLabel
          label="Mật khẩu"
          className={formik.touched.password && formik.errors.password && "text-red"}
        >
          <Form.Control
            type="password"
            placeholder="Mật khẩu"
            className={formik.touched.password && formik.errors.password ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </FloatingLabel>
        {formik.touched.password && formik.errors.password && <p className="text-red fs-85">{formik.errors.password}</p>}
      </div>
      <div className="mb-3">
        <Form.Check
          type="checkbox"
          id="rememberMe"
          label="Ghi nhớ đăng nhập"
          name="rememberMe"
          onChange={formik.handleChange}
        />
      </div>
      <div className="d-flex justify-content-center">
        {formik.isSubmitting ?
          <button disabled className="btn-df btn-df--green btn-spinner cursor-wait w-100 text-uppercase" type="submit">
            <Spinner animation="border" variant="light" className="spinner" size="sm" />
          </button> :
          <button className="btn-df btn-df--green w-100 text-uppercase" type="submit">Đăng nhập</button>
        }

      </div>

    </Form>
  );
};

export default FormLogin;