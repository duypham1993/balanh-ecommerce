import { Grid, Switch, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const FormCustomer = ({ formCustomer }) => {
  const navigate = useNavigate();

  // back to suppliers
  const handleCancel = () => {
    return navigate("/customers");
  };

  return (
    <form className="form-default" onSubmit={formCustomer.handleSubmit}>
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
              value={formCustomer.values.name}
              onChange={formCustomer.handleChange}
              onBlur={formCustomer.handleBlur}
            />
            <p className={formCustomer.touched.name && formCustomer.errors.name ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.name}</p>
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
              value={formCustomer.values.email}
              onChange={formCustomer.handleChange}
              onBlur={formCustomer.handleBlur}
              placeholder="example@abc.com"
            />
            <p className={formCustomer.touched.email && formCustomer.errors.email ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.email}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Mật khẩu</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              autoComplete="new-password"
              type="password"
              className="input-default form-default__input"
              name="password"
              value={formCustomer.values.password}
              onChange={formCustomer.handleChange}
              onBlur={formCustomer.handleBlur}
            />
            <p className={formCustomer.touched.password && formCustomer.errors.password ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.password}</p>
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
              value={formCustomer.values.phone}
              onChange={formCustomer.handleChange}
              onBlur={formCustomer.handleBlur}
            />
            <p className={formCustomer.touched.phone && formCustomer.errors.phone ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.phone}</p>
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
              value={formCustomer.values.gender}
              onChange={formCustomer.handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="other" control={<Radio />} label="Khác" />
            </RadioGroup>
            <p className={formCustomer.touched.gender && formCustomer.errors.gender ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.gender}</p>
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
                value={formCustomer.values.dateOfBirth ? moment(formCustomer.values.dateOfBirth) : formCustomer.values.dateOfBirth}
                onChange={(value) => formCustomer.setFieldValue('dateOfBirth', value)}
                onBlur={formCustomer.handleBlur}
                renderInput={(params) => <TextField
                  onBlur={formCustomer.handleBlur} name='dateOfBirth' {...params} />}
                inputFormat="DD/MM/YYYY"
              />
            </LocalizationProvider>
            <p className={formCustomer.touched.dateOfBirth && formCustomer.errors.dateOfBirth ? "form-default__error show" : "form-default__error"}>{formCustomer.errors.dateOfBirth}</p>
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
              checked={formCustomer.values.isActive}
              onChange={formCustomer.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <p className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</p>
        {formCustomer.isSubmitting ?
          <button className="btn-df cursor-disable" type="submit" disabled>Lưu</button> :
          <button className="btn-df" type="submit" >Lưu</button>
        }

      </div>
    </form >
  )
};

export default FormCustomer;