import { Grid, Switch, Autocomplete, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";


const FormAdmin = ({ formAdmin }) => {
  const navigate = useNavigate();
  const role = ["Admin", "Kế toán"];

  const handleCancel = () => {
    return navigate("/admins");
  }
  return (
    <form className="form-default" onSubmit={formAdmin.handleSubmit}>
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
              value={formAdmin.values.lastName}
              onChange={formAdmin.handleChange}
              onBlur={formAdmin.handleBlur}
            />
            <p className={formAdmin.touched.lastName && formAdmin.errors.lastName ? "form-default__error show" : "form-default__error"}>{formAdmin.errors.lastName}</p>
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
              value={formAdmin.values.firstName}
              onChange={formAdmin.handleChange}
              onBlur={formAdmin.handleBlur}
            />
            <p className={formAdmin.touched.firstName && formAdmin.errors.firstName ? "form-default__error show" : "form-default__error"}>{formAdmin.errors.firstName}</p>

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
              value={formAdmin.values.email}
              onChange={formAdmin.handleChange}
              onBlur={formAdmin.handleBlur}
              placeholder="example@abc.com"
            />
            <p className={formAdmin.touched.email && formAdmin.errors.email ? "form-default__error show" : "form-default__error"}>{formAdmin.errors.email}</p>
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
              value={formAdmin.values.password}
              onChange={formAdmin.handleChange}
              onBlur={formAdmin.handleBlur}
            />
            <p className={formAdmin.touched.password && formAdmin.errors.password ? "form-default__error show" : "form-default__error"}>{formAdmin.errors.password}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Chức vụ</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <Autocomplete
              className="form-default__autocomplete"
              options={role}
              value={formAdmin.values.role}
              onChange={(e, value) => value ? formAdmin.setFieldValue("role", value) : formAdmin.setFieldValue("role", "")}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              onBlur={formAdmin.handleBlur}
              renderInput={(params) =>
                <TextField
                  name="role"
                  {...params}
                />
              }
            />
            <p className={formAdmin.touched.role && formAdmin.errors.role ? "form-default__error show" : "form-default__error"}>{formAdmin.errors.role}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={4} className="form-default__label">
            <label>Hiển thị</label>
          </Grid>
          <Grid item xs={6} className="form-default__content">
            <Switch
              name="isActive"
              className="form-default__input"
              checked={formAdmin.values.isActive}
              onChange={formAdmin.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <button className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</button>
        {formAdmin.isSubmitting ?
          <button className="btn-df cursor-disable" type="submit" disabled >
            Lưu
          </button> :
          <button className="btn-df" type="submit" >Lưu</button>
        }
      </div>
    </form >
  )
};

export default FormAdmin;