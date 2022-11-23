import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { selectData } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, resetErrorPassword, updateCurrentUser } from "../../redux/slice/loginSlice";
import { getLocalCurrentUser } from "../../services/localStorage";
import SubmitAlert from "../../components/SubmitAlert/SubmitAlert";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const localUser = getLocalCurrentUser();
  const userID = localUser._id;
  const currentUser = useSelector(selectData("login", "currentUser"));
  const [inputs, setInputs] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    role: "",
    newPW: "",
    confirmPW: ""
  });
  const [changePW, setChangePW] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const errorApi = useSelector(selectData("login", "error"));
  const statusSubmit = useSelector(selectData("login", "statusSubmit"));
  const mess = {
    success: "Cập nhật tài khoản thành công!",
    error: errorApi?.other
  }

  useEffect(() => {
    dispatch(getCurrentUser(userID));
  }, []);

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length) {
      setInputs({
        ...inputs,
        lastName: currentUser.lastName,
        firstName: currentUser.firstName,
        email: currentUser.email,
        role: currentUser.role,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setChangePW(false);
      setInputs({
        ...inputs,
        password: "",
        newPW: "",
        confirmPW: ""
      })
    }
  }, [statusSubmit])

  const handleChangeInputs = (e) => {
    const { value, name } = e.target;

    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    // remove error if target has value
    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  };

  const validate = (inputs) => {
    const errors = {};
    const formatPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (!inputs.lastName.trim()) {
      errors.lastName = "Vui lòng điền vào mục này!";
    }

    if (!inputs.firstName.trim()) {
      errors.firstName = "Vui lòng điền vào mục này!";
    }

    if (changePW) {
      if (!inputs.password.trim()) {
        errors.password = "Vui lòng điền vào mục này!";
      }
      if ((!formatPassword.test(inputs.newPW)) || (inputs.newPW && !formatPassword.test(inputs.newPW))) {
        errors.newPW = "Mật khẩu không hợp lệ!";
      }

      if (inputs.newPW !== inputs.confirmPW) {
        errors.newPW = "Mật khẩu không khớp!"
        errors.confirmPW = "Mật khẩu không khớp!"
      }

      if (!inputs.newPW.trim()) {
        errors.newPW = "Vui lòng điền vào mục này!";
      }

      if (!inputs.confirmPW.trim()) {
        errors.confirmPW = "Vui lòng điền vào mục này!";
      }
    }

    if (!inputs.role) {
      errors.role = "Vui lòng chọn mục này!";
    }
    return errors;
  }

  const handleChangePW = () => {
    setChangePW(!changePW);
  }

  const handleOnSubmit = () => {
    let updatedAdmin
    if (changePW) {
      updatedAdmin = {
        lastName: inputs.lastName,
        firstName: inputs.firstName,
        password: inputs.password,
        newPW: inputs.newPW,
        statusChangePW: changePW
      }
    } else {
      updatedAdmin = {
        lastName: inputs.lastName,
        firstName: inputs.firstName,
        statusChangePW: changePW
      }
    }

    dispatch(updateCurrentUser({ userID, updatedAdmin }));
  };

  const submitFrom = (e) => {
    e.preventDefault();
    dispatch(resetErrorPassword());
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
  }
  // back to suppliers
  const handleCancel = () => {
    return navigate("/admins");
  }

  return (
    <>
      <form className="form-default" onSubmit={(e) => submitFrom(e)}>
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
                value={inputs.lastName}
                onChange={e => handleChangeInputs(e)}
              />
              <p className={formErrors.lastName ? "form-default__error show" : "form-default__error"}>{formErrors.lastName}</p>
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
                value={inputs.firstName}
                onChange={(e) => handleChangeInputs(e)}
              />
              <p className={formErrors.firstName ? "form-default__error show" : "form-default__error"}>{formErrors.firstName}</p>

            </Grid>
          </Grid>
          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Email</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <span className="form-default__text">
                {inputs.email}
              </span>
            </Grid>
          </Grid>
          {!changePW ? (
            <Grid container item spacing={3} className="form-default__group">
              <Grid item xs={12} sm={4} className="form-default__label">
                <label>Mật khẩu</label>
              </Grid>
              <Grid item xs={12} sm={6} className="form-default__content form-default__content--row">
                <span className="form-default__text">***********</span>
                <button className="form-default__change" onClick={(e) => handleChangePW()}>Thay đổi</button>
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
                    autoComplete="off"
                    value={inputs.password}
                    onChange={(e) => handleChangeInputs(e)}
                  />
                  <p className={formErrors.password || errorApi?.password ? "form-default__error show" : "form-default__error"}>{formErrors.password || errorApi?.password}</p>
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
                    autoComplete="off"
                    value={inputs.newPW}
                    onChange={(e) => handleChangeInputs(e)}
                  />
                  <p className={formErrors.newPW ? "form-default__error show" : "form-default__error"}>{formErrors.newPW}</p>
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
                    autoComplete="off"
                    value={inputs.confirmPW}
                    onChange={(e) => handleChangeInputs(e)}
                  />
                  <p className={formErrors.confirmPW ? "form-default__error show" : "form-default__error"}>{formErrors.confirmPW}</p>
                </Grid>
              </Grid>
            </>
          )}

          <Grid container item spacing={3} className="form-default__group">
            <Grid item xs={12} sm={4} className="form-default__label">
              <label>Chức vụ</label>
            </Grid>
            <Grid item xs={12} sm={6} className="form-default__content">
              <span className="form-default__text">{inputs.role}</span>
            </Grid>
          </Grid>
        </Grid>
        <div className="flex-bw-center form-default__bot-nav">
          <p className="btn-default btn-default--del" onClick={() => handleCancel()}>Quay lại</p>
          <button className="btn-default" type="submit" >Lưu</button>
        </div>
      </form >
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </>

  )
};

export default Profile;