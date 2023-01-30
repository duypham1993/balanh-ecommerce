import { Grid, Switch, Autocomplete, TextField } from '@mui/material';
import { cityData } from "../../data/city";
import { useNavigate } from "react-router-dom";

const FormSupplier = ({ formSupplier }) => {
  const navigate = useNavigate();
  const city = cityData.map(item => item.name);
  const district = cityData.find(item => item.name === formSupplier.values.city);
  const arrDistrict = district && district.districts.map(item => item.name);
  const wards = district && district.districts.find(item => item.name === formSupplier.values.district);
  const arrWards = wards && wards.wards.map(item => item.name);

  const handleChangeAutocomplete = (name, value) => {
    if (name === "city") {
      formSupplier.setFieldValue('district', '');
      formSupplier.setFieldValue('wards', '');
    }
    if (name === "district") {
      formSupplier.setFieldValue('wards', '');
    }

    value ? formSupplier.setFieldValue(name, value) : formSupplier.setFieldValue(name, '');
  }

  // back to suppliers
  const handleCancel = () => {
    return navigate("/suppliers");
  }

  return (
    <form className="form-default" onSubmit={formSupplier.handleSubmit}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Tên nhà cung cấp</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className="input-default form-default__input"
              name="name"
              value={formSupplier.values.name}
              onChange={formSupplier.handleChange}
              onBlur={formSupplier.handleBlur}
            />
            <p className={formSupplier.touched.name && formSupplier.errors.name ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.name}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Mã tham chiếu</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className="input-default form-default__input"
              name="sku"
              value={formSupplier.values.sku}
              onChange={formSupplier.handleChange}
              onBlur={formSupplier.handleBlur}
            />
            <p className={formSupplier.touched.sku && formSupplier.errors.sku ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.sku}</p>
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
              value={formSupplier.values.email}
              onChange={formSupplier.handleChange}
              onBlur={formSupplier.handleBlur}
              placeholder="example@abc.com"
            />
            <p className={formSupplier.errors.email && formSupplier.touched.email ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.email}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Tỉnh/Thành phố</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <Autocomplete
              className="form-default__autocomplete"
              id="city"
              options={city}
              value={formSupplier.values.city}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              onChange={(e, value) => handleChangeAutocomplete('city', value)}
              renderInput={(params) => <TextField {...params} name="city"
              />}
            />
            <p className={formSupplier.touched.city && formSupplier.errors.city ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.city}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Quận/Huyện</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {arrDistrict ?
              <Autocomplete
                className="form-default__autocomplete"
                options={arrDistrict}
                value={formSupplier.values.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAutocomplete('district', value)}
                renderInput={(params) => <TextField {...params}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                disabled
                options={city}
                value={formSupplier.values.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formSupplier.touched.district && formSupplier.errors.district ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.district}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Phường/Xã</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {arrWards ?
              <Autocomplete
                className="form-default__autocomplete"
                options={arrWards}
                value={formSupplier.values.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAutocomplete('wards', value)}
                renderInput={(params) => <TextField {...params}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                options={city}
                disabled
                value={formSupplier.values.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formSupplier.touched.wards && formSupplier.errors.wards ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.wards}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Địa chỉ</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              name="street"
              className="input-default form-default__input"
              value={formSupplier.values.street}
              onChange={formSupplier.handleChange}
              onBlur={formSupplier.handleBlur}
            />
            <p className={formSupplier.touched.street && formSupplier.errors.street ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.street}</p>
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
              value={formSupplier.values.phone}
              onChange={formSupplier.handleChange}
              onBlur={formSupplier.handleBlur}
            />
            <p className={formSupplier.touched.phone && formSupplier.errors.phone ? "form-default__error show" : "form-default__error"}>{formSupplier.errors.phone}</p>
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
              checked={formSupplier.values.isActive}
              onChange={formSupplier.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <p className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</p>
        <button className="btn-df" type="submit" >Lưu</button>
      </div>
    </form >
  )
};

export default FormSupplier;