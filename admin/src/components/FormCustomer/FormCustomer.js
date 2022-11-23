import { useState } from "react";
import { Grid, Switch, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../redux/selectors";
import { resetErorrEmail } from "../../redux/slice/customerSlice";

const FormCustomer = (props) => {
  const { inputs, handleDatePicker, handleOnChange, handleOnSubmit, id } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const errorApi = useSelector(selectData("customer", "error"))

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

  const validate = (inputs) => {
    const errors = {};
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const formatPhone = /^\d{10,12}$/;

    if (!inputs.name.trim()) {
      errors.name = "Vui lòng điền vào mục này!";
    }

    if (!formatEmail.test(inputs.email)) {
      errors.email = "Email không hợp lệ!";
    }

    if (!inputs.email.trim()) {
      errors.email = "Vui lòng điền vào mục này!";
    }

    if ((inputs.password.length < 8 && !id) || (id && inputs.password && inputs.password.length < 8)) {
      errors.password = "Mật khẩu không được ít hơn 8 kí tự!";
    }

    if (!inputs.password.trim() && !id) {
      errors.password = "Vui lòng điền vào mục này!";
    }

    if (!formatPhone.test(inputs.phone)) {
      errors.phone = "Số điện thoại không hợp lệ!"
    }

    if (!inputs.phone.trim()) {
      errors.phone = "Vui lòng điền vào mục này!";
    }

    if (!inputs.gender) {
      errors.gender = "Vui lòng chọn mục này!";
    }

    if ((inputs.dateOfBirth && !inputs.dateOfBirth.isValid()) || (inputs.dateOfBirth && inputs.dateOfBirth.isAfter(new Date()))) {
      errors.dateOfBirth = "Ngày sinh không hợp lệ!";
    }

    return errors;
  }

  const submitFrom = (e) => {
    e.preventDefault();
    dispatch(resetErorrEmail());
    setFormErrors(validate(inputs));
    Object.keys(validate(inputs)).length === 0 && handleOnSubmit();
  }

  // back to suppliers
  const handleCancel = () => {
    return navigate("/customers");
  };

  return (
    <form className="form-default" onSubmit={(e) => submitFrom(e)}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Họ và tên</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className="input-default form-default__input"
              name="name"
              value={inputs.name}
              onChange={e => handleChangeInputs(e)}
            />
            <p className={formErrors.name ? "form-default__error show" : "form-default__error"}>{formErrors.name}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Email</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
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
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Mật khẩu</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              autoComplete="off"
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
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Số điện thoại</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className="input-default form-default__input"
              name="phone"
              value={inputs.phone}
              onChange={(e) => handleChangeInputs(e)}
            />
            <p className={formErrors.phone ? "form-default__error show" : "form-default__error"}>{formErrors.phone}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Giới tính</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <RadioGroup
              row
              name="gender"
              value={inputs.gender}
              onChange={e => handleChangeInputs(e)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="other" control={<Radio />} label="Khác" />
            </RadioGroup>
            <p className={formErrors.gender ? "form-default__error show" : "form-default__error"}>{formErrors.gender}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Ngày sinh</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                className="form-default__date"
                disableFuture
                openTo="year"
                views={['year', 'month', 'day']}
                value={inputs.dateOfBirth}
                onChange={(value) => handleDatePicker(value)
                }
                renderInput={(params) => <TextField {...params} />}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>
            <p className={formErrors.dateOfBirth ? "form-default__error show" : "form-default__error"}>{formErrors.dateOfBirth}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={4} className="form-default__label">
            <label>Kích hoạt</label>
          </Grid>
          <Grid item xs={6} className="form-default__content">
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

export default FormCustomer;