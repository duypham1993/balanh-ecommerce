import { useState, useEffect } from "react";
import { Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { selectData } from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { resetErrorEmail, updateAdmin } from "../../redux/slice/adminSlice";
import { getCurrentUser } from "../../redux/slice/loginSlice";
import { getLocalCurrentUser } from "../../services/localStorage";

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
  });
  const [formErrors, setFormErrors] = useState({});
  const errorApi = useSelector(selectData("admin", "error"));

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
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const formatPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

    if (!inputs.lastName || !inputs.lastName.trim()) {
      errors.lastName = "Vui lòng điền vào mục này!";
    }

    if (!inputs.firstName || !inputs.firstName.trim()) {
      errors.firstName = "Vui lòng điền vào mục này!";
    }

    if (!formatEmail.test(inputs.email)) {
      errors.email = "Email không hợp lệ!";
    }

    if (!inputs.email || !inputs.email.trim()) {
      errors.email = "Vui lòng điền vào mục này!";
    }

    if ((!formatPassword.test(inputs.password)) || (inputs.password && !formatPassword.test(inputs.password))) {
      errors.password = "Mật khẩu không hợp lệ!";
    }

    if ((!inputs.password || !inputs.password.trim())) {
      errors.password = "Vui lòng điền vào mục này!";
    }

    if (!inputs.role) {
      errors.role = "Vui lòng chọn mục này!";
    }
    return errors;
  }

  const handleOnSubmit = () => {
    const updatedAdmin = {
      lastName: inputs.lastName,
      firstName: inputs.firstName,
      email: inputs.email,
      password: inputs.password,
      role: inputs.role,
      isActive: inputs.isActive,
    }
    dispatch(updateAdmin({ userID, updatedAdmin }));
  };
  const submitFrom = (e) => {
    e.preventDefault();
    dispatch(resetErrorEmail());
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
  }
  // back to suppliers
  const handleCancel = () => {
    return navigate("/admins");
  }

  return (
    <form className="form-default" onSubmit={(e) => submitFrom(e)}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Họ và tên đệm</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
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
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Tên</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
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
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Email</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
            <input
              type="text"
              name="email"
              className="input-default form-default__input"
              value={inputs.email}
              onChange={(e) => handleChangeInputs(e)}
              placeholder="example@abc.com"
            />
            <p className={formErrors.email || errorApi.email ? "form-default__error show" : "form-default__error"}>{formErrors.email || errorApi.email}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Mật khẩu</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
            <input
              type="password"
              className="input-default form-default__input"
              name="password"
              autoComplete="off"
              value={inputs.password}
              onChange={(e) => handleChangeInputs(e)}
            />
            <p className={formErrors.password ? "form-default__error show" : "form-default__error"}>{formErrors.password}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Chức vụ</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
            <input
              disabled
              className="input-default form-default__input"
              value={inputs.role}
              onChange={(e) => handleChangeInputs(e)}

            />
            <p className={formErrors.role ? "form-default__error show" : "form-default__error"}>{formErrors.role}</p>
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <p className="btn-default btn-default--del" onClick={() => handleCancel()}>Quay lại</p>
        <button className="btn-default" type="submit" >Lưu</button>
      </div>
    </form >
  )
};

export default Profile;