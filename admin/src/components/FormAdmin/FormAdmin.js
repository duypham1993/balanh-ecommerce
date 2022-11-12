import { useState } from "react";
import { Grid, Switch, Autocomplete, TextField } from '@mui/material';

const FormAdmin = (props) => {
  const { inputs, setInputs, admins, currentAdmin, handleOnChange, handleOnSubmit, handleCancel } = props;
  const [formErrors, setFormErrors] = useState({});
  const role = ["Admin", "Kế toán"];

  const handleChangeInputs = (e) => {
    const { value, name } = e.target;

    handleOnChange(e);
    // remove error if target has value
    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  };
  const handleChangeRole = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
    // remove error if target has value
    if (value) {
      setFormErrors({
        ...formErrors, [role]: "",
      })
    }
  }

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

    if (!formatPassword.test(inputs.password)) {
      errors.password = "Mật khẩu không hợp lệ!";
    }

    if (!inputs.password || !inputs.password.trim()) {
      errors.password = "Vui lòng điền vào mục này!";
    }

    if (!inputs.confirmPassword || !inputs.confirmPassword.trim()) {
      errors.confirmPassword = "Vui lòng điền vào mục này!";
    }

    if (inputs.password !== inputs.confirmPassword) {
      errors.confirmPassword = "Mật khẩu không khớp!";
    }

    if (!inputs.role) {
      errors.role = "Vui lòng chọn mục này!";
    }
    return errors;
  }

  const submitFrom = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
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
            <p className={formErrors.email ? "form-default__error show" : "form-default__error"}>{formErrors.email}</p>
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
              value={inputs.password}
              onChange={(e) => handleChangeInputs(e)}
            />
            <p className={formErrors.password ? "form-default__error show" : "form-default__error"}>{formErrors.password}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Xác nhận mật khẩu</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
            <input
              type="password"
              className="input-default form-default__input"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={(e) => handleChangeInputs(e)}
            />
            <p className={formErrors.confirmPassword ? "form-default__error show" : "form-default__error"}>{formErrors.confirmPassword}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__control">
            <label>Chức vụ</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__input-group">
            <Autocomplete
              className="form-default__autocomplete"
              options={role}
              value={inputs.role}
              onChange={(e, value) => handleChangeRole("role", value)}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              renderInput={(params) => <TextField {...params}
              />}
            />
            <p className={formErrors.role ? "form-default__error show" : "form-default__error"}>{formErrors.role}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={4} className="form-default__control">
            <label>Hiển thị</label>
          </Grid>
          <Grid item xs={6} className="form-default__input-group">
            <Switch
              name="isActive"
              className="form-default__input"
              checked={inputs.isActive}
              onChange={(e) => handleOnChange(e)}
            />
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

export default FormAdmin;