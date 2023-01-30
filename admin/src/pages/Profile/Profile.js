import { useState } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "../../redux/slice/authSlice";
import { getLocalCurrentUser } from "../../utils/localStorage";
import SubmitAlert from "../../components/SubmitAlert/SubmitAlert";
import { useFormik } from "formik";
import { UPDATE_PROFILE_SUCCESS, VALIDATE_FORM_PROFILE } from "../../shared/constants";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localUser = getLocalCurrentUser();
  const userID = localUser._id;
  const [mess, setMess] = useState({});

  const formProfile = useFormik({
    initialValues: {
      lastName: localUser.lastName || "",
      firstName: localUser.firstName || "",
      email: localUser.email || "",
      password: "",
      role: localUser.role || "",
      isChangePW: false,
      newPW: "",
      confirmPW: ""
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_PROFILE,
    onSubmit: (values, { setSubmitting }) => {
      let updatedAdmin
      if (values.isChangePW) {
        updatedAdmin = {
          _id: userID,
          lastName: values.lastName,
          firstName: values.firstName,
          password: values.password,
          newPW: values.newPW,
          isChangePW: values.isChangePW
        }
      } else {
        updatedAdmin = {
          _id: userID,
          lastName: values.lastName,
          firstName: values.firstName,
          isChangePW: values.isChangePW
        }
      }

      dispatch(updateCurrentUser(updatedAdmin))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: UPDATE_PROFILE_SUCCESS });
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.password) formProfile.errors.password = error.password;
          error.other && setMess({ error: error.other });
        })
    }
  })

  // back to suppliers
  const handleCancel = () => {
    return navigate("/admins");
  }

  return (
    <>
      <form className="form-default" onSubmit={formProfile.handleSubmit}>
        <Grid container>
          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Họ và tên đệm</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <input
                type="text"
                className="input-default form-default__input"
                name="lastName"
                value={formProfile.values.lastName}
                onChange={formProfile.handleChange}
                onBlur={formProfile.handleBlur}
              />
              <p className={formProfile.touched.lastName && formProfile.errors.lastName ? "form-default__error show" : "form-default__error"}>{formProfile.errors.lastName}</p>
            </Grid>
          </Grid>
          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Tên</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <input
                type="text"
                className="input-default form-default__input"
                name="firstName"
                value={formProfile.values.firstName}
                onChange={formProfile.handleChange}
                onBlur={formProfile.handleBlur}
              />
              <p className={formProfile.touched.firstName && formProfile.errors.firstName ? "form-default__error show" : "form-default__error"}>{formProfile.errors.firstName}</p>

            </Grid>
          </Grid>
          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Email</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <span className="form-default__text">
                {formProfile.values.email}
              </span>
            </Grid>
          </Grid>
          {!formProfile.values.isChangePW ? (
            <Grid container item spacing={3} className="form-default__group">
              <Grid item xs={12} sm={4} className="form-default__label">
                <label>Mật khẩu</label>
              </Grid>
              <Grid item xs={12} sm={6} className="form-default__content form-default__content--row">
                <span className="form-default__text">***********</span>
                <button className="form-default__change" onClick={(e) => formProfile.setFieldValue("isChangePW", !formProfile.values.isChangePW)}>Thay đổi</button>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container item spacing={3} className="form-default__group">
                <Grid item xs={12} sm={4} className="form-default__label">
                  <label>Mật khẩu hiện tại</label>
                </Grid>
                <Grid item xs={12} sm={6} className="form-default__content">
                  <input
                    type="password"
                    className="input-default form-default__input"
                    name="password"
                    autoComplete="new-password"
                    value={formProfile.values.password}
                    onChange={formProfile.handleChange}
                    onBlur={formProfile.handleBlur}
                  />
                  <p className={formProfile.touched.password && formProfile.errors.password ? "form-default__error show" : "form-default__error"}>{formProfile.errors.password}</p>
                </Grid>
              </Grid>
              <Grid container item spacing={3} className="form-default__group">
                <Grid item xs={12} sm={4} className="form-default__label">
                  <label>Mật khẩu mới</label>
                </Grid>
                <Grid item xs={12} sm={6} className="form-default__content">
                  <input
                    type="password"
                    className="input-default form-default__input"
                    name="newPW"
                    value={formProfile.values.newPW}
                    onChange={formProfile.handleChange}
                    onBlur={formProfile.handleBlur}
                  />
                  <p className={formProfile.touched.newPW && formProfile.errors.newPW ? "form-default__error show" : "form-default__error"}>{formProfile.errors.newPW}</p>
                </Grid>
              </Grid>
              <Grid container item spacing={3} className="form-default__group">
                <Grid item xs={12} sm={4} className="form-default__label">
                  <label>Xác nhận mật khẩu</label>
                </Grid>
                <Grid item xs={12} sm={6} className="form-default__content">
                  <input
                    type="password"
                    className="input-default form-default__input"
                    name="confirmPW"
                    value={formProfile.values.confirmPW}
                    onChange={formProfile.handleChange}
                    onBlur={formProfile.handleBlur}
                  />
                  <p className={formProfile.touched.confirmPW && formProfile.errors.confirmPW ? "form-default__error show" : "form-default__error"}>{formProfile.errors.confirmPW}</p>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Chức vụ</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <span className="form-default__text">{formProfile.values.role}</span>
            </Grid>
          </Grid>
        </Grid>
        <div className="flex-bw-center form-default__bot-nav">
          <p className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</p>
          <button className="btn-df" type="submit" >Lưu</button>
        </div>
      </form >
      <SubmitAlert
        mess={mess}
      />
    </>

  )
};

export default Profile;