import "./profile.scss";
import { Form, FloatingLabel, Collapse, Modal, Spinner } from "react-bootstrap";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getLocalCurrentUser } from "../../../utils/localStorage";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateUser, logout } from "../../../redux/slice/authSlice";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const localUser = getLocalCurrentUser();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const formik = useFormik({
    initialValues: {
      name: localUser.name,
      email: localUser.email,
      gender: localUser.gender,
      isChangePW: false,
      currentPassword: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: moment(localUser?.dateOfBirth).format("YYYY-MM-DD"),
      phone: localUser.phone
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(true),
      dateOfBirth: Yup.string()
        .required(true),
      phone: Yup.string()
        .min(10, true)
        .required(true),
      isChangePW: Yup.boolean(),
      currentPassword: Yup.string()
        .when("isChangePW", {
          is: true,
          then: Yup.string()
            .required(true)
            .min(8, "Mật khẩu không được ít hơn 8 kí tự!")
        }),
      password: Yup.string()
        .when("isChangePW", {
          is: true,
          then: Yup.string()
            .required(true)
            .min(8, "Mật khẩu không được ít hơn 8 kí tự!")
        }),
      confirmPassword: Yup.string()
        .when("isChangePW", {
          is: true,
          then: Yup.string()
            .oneOf([Yup.ref("password")], "Mật khẩu không khớp!")
            .required(true)
        })
    }),
    onSubmit: (values, { setSubmitting }) => {
      let user;

      if (values.isChangePW) {
        user = {
          name: values.name,
          dateOfBirth: moment(values.dateOfBirth),
          gender: values.gender,
          phone: values.phone,
          currentPassword: values.currentPassword,
          password: values.password,
        }
      } else {
        user = {
          name: values.name,
          dateOfBirth: moment(values.dateOfBirth),
          gender: values.gender,
          phone: values.phone
        }
      };

      dispatch(updateUser({ id: localUser._id, user: user }))
        .unwrap()
        .then(() => {
          // show notification and close after 2s
          setShow(true);
          setTimeout(handleClose, 2000);

          if (user.isChangePW) {
            dispatch(logout());
          };

          setSubmitting(false);
        })
        .catch((error) => {
          formik.errors.currentPassword = error.password;
          setSubmitting(false);
        })
    }
  });

  return (
    <div className="d-flex justify-content-center bg-white shadow-sm">
      <Form className="py-5 px-4 col-12 col-sm-9 col-md-7 col-lg-4" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <h5 className="mb-2 fs-6">Giới tính</h5>
          <div className="d-flex align-items-center">
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={formik.handleChange}
              checked={"male" === formik.values.gender}
            />
            <label htmlFor="male" className="me-3 ms-1">Nam</label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={formik.handleChange}
              checked={"female" === formik.values.gender}
            />
            <label htmlFor="female" className="me-3 ms-1">Nữ</label>

            <input
              type="radio"
              id="other"
              name="gender"
              value="other"
              onChange={formik.handleChange}
              checked={"other" === formik.values.gender}
            />
            <label htmlFor="other" className="me-3 ms-1">Khác</label>
          </div>
        </div>
        <div className="mb-3">
          <FloatingLabel
            label="Họ và tên"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Họ và tên"
              className={formik.touched.name && formik.errors.name ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </FloatingLabel>
        </div>

        <div className="mb-3">
          <FloatingLabel label="Ngày sinh">
            <Form.Control
              type="date"
              placeholder="Ngày sinh"
              className={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
              name="dateOfBirth"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dateOfBirth}
            />
          </FloatingLabel>
        </div>

        <div className="mb-3">
          <FloatingLabel label="Số điện thoại" >
            <Form.Control
              type="text"
              placeholder="Số điện thoại"
              className={formik.touched.phone && formik.errors.phone ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </FloatingLabel>
        </div>

        <div className="mb-3">
          <FloatingLabel label="Email">
            <Form.Control
              type="email"
              placeholder="Email"
              className="rounded-0 input-df"
              disabled
              name="email"
              value={formik.values.email}
            />
          </FloatingLabel>
        </div>

        <div className="position-relative mb-3">
          <FloatingLabel label="Mật khẩu">
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              className={formik.touched.currentPassword && formik.errors.currentPassword ? "rounded-0 input-df input-error profile-page__password" : "rounded-0 input-df profile-page__password"} name="currentPassword"
              autoComplete="off"
              disabled={!formik.values.isChangePW}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
          </FloatingLabel>
          {formik.touched.currentPassword && formik.errors.currentPassword && <p className="text-red fs-85">{formik.errors.currentPassword}</p>}
          <span aria-expanded={formik.values.isChangePW} aria-controls="changePW" className="position-absolute top-0 end-0 text-green text-decoration-underline profile-page__changePW">
            {formik.values.isChangePW ?
              <label htmlFor='isChangePW'>
                <CancelIcon className="fs-5" />
                <span className="ps-1 pe-2">Huỷ</span>
              </label>
              :
              <label htmlFor='isChangePW' >
                <ChangeCircleIcon className="fs-5" />
                <span className="ps-1 pe-2">Đổi mật khẩu</span>
              </label>
            }
            <input
              type="checkbox"
              id='isChangePW'
              name='isChangePW'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              hidden
            />
          </span>
        </div>
        <Collapse in={formik.values.isChangePW}>
          <div id="changePW">
            <div className="mb-3">
              <FloatingLabel label="Mật khẩu mới" >
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu mới"
                  className={formik.touched.password && formik.errors.password ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  autoComplete="off" />
              </FloatingLabel>
              {formik.touched.password && formik.errors.password && <p className="text-red fs-85">{formik.errors.password}</p>}
            </div>
            <div className="mb-4">
              <FloatingLabel label="Xác nhận mật khẩu" >
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  className={formik.touched.confirmPassword && formik.errors.confirmPassword ? "rounded-0 input-df input-error" : "rounded-0 input-df"}
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  autoComplete="off" />
              </FloatingLabel>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className="text-red fs-85">{formik.errors.confirmPassword}</p>}
            </div>
          </div>
        </Collapse>
        {formik.isSubmitting ?
          <button disabled className="btn-df btn-df--green btn-spinner w-100 cursor-wait" type="submit">
            <Spinner animation="border" variant="light" className="spinner" />
          </button>
          :
          <button className="btn-df btn-df--green w-100" type="submit">Lưu</button>
        }
      </Form>
      <Modal show={show} onHide={handleClose} centered className="custom-notification">
        <Modal.Body className="text-center text-green">
          <CheckCircleIcon className="fs-1" />
          <p className="mt-2 fs-5">Cập nhật thành công!</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;