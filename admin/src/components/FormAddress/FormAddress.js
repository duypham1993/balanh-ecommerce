import { Grid, Autocomplete, TextField, Switch } from '@mui/material';
import { cityData } from "../../data/city";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../redux/slice/customerSlice';

const FormAddress = ({ formAddress, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const city = cityData.map(item => item.name);
  const district = cityData.find(item => item.name === formAddress.values.city);
  const arrDistrict = district && district.districts.map(item => item.name);
  const wards = district && district.districts.find(item => item.name === formAddress.values.district);
  const arrWards = wards && wards.wards.map(item => item.name);
  const { customers } = useSelector(state => state.customer);
  const listEmail = customers?.map(customer => customer.email);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const handleChangeAutocomplete = (name, value) => {
    if (name === "city") {
      formAddress.setFieldValue('district', '');
      formAddress.setFieldValue('wards', '');
    }
    if (name === "district") {
      formAddress.setFieldValue('wards', '');
    }

    value ? formAddress.setFieldValue(name, value) : formAddress.setFieldValue(name, '');
  }

  // back to suppliers
  const handleCancel = () => {
    return navigate("/customers/addresses/");
  }

  return (
    <form className="form-default" onSubmit={formAddress.handleSubmit}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Email khách hàng</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {!id ?
              <Autocomplete
                className="form-default__autocomplete"
                options={listEmail}
                value={formAddress.values.email}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => value ? formAddress.setFieldValue("email", value) : formAddress.setFieldValue("email", "")}
                renderInput={(params) =>
                  <TextField
                    onBlur={formAddress.handleBlur}
                    name="email"
                    {...params}
                  />}
              /> :
              <input
                type="text"
                className="input-default form-default__input"
                name="email"
                value={formAddress.values.email}
                disabled
              />
            }
            <p className={formAddress.touched.email && formAddress.errors.email ? "form-default__error show" : "form-default__error"}>{formAddress.errors.email}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Họ tên người nhận</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <input
              type="text"
              className="input-default form-default__input"
              name="name"
              value={formAddress.values.name}
              onChange={formAddress.handleChange}
              onBlur={formAddress.handleBlur}
            />
            <p className={formAddress.touched.name && formAddress.errors.name ? "form-default__error show" : "form-default__error"}>{formAddress.errors.name}</p>
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
              value={formAddress.values.city}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              onChange={(e, value) => handleChangeAutocomplete("city", value)}
              renderInput={(params) => <TextField {...params} name="city" onBlur={formAddress.handleBlur}
              />}
            />
            <p className={formAddress.touched.city && formAddress.errors.city ? "form-default__error show" : "form-default__error"}>{formAddress.errors.city}</p>
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
                value={formAddress.values.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAutocomplete('district', value)}
                renderInput={(params) => <TextField {...params} name='district' onBlur={formAddress.handleBlur}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                disabled
                options={city}
                value={formAddress.values.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formAddress.touched.district && formAddress.errors.district ? "form-default__error show" : "form-default__error"}>{formAddress.errors.district}</p>
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
                value={formAddress.values.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAutocomplete('wards', value)}
                renderInput={(params) => <TextField name='wards' onBlur={formAddress.handleBlur} {...params}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                options={city}
                disabled
                value={formAddress.values.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formAddress.touched.wards && formAddress.errors.wards ? "form-default__error show" : "form-default__error"}>{formAddress.errors.wards}</p>
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
              value={formAddress.values.street}
              onChange={formAddress.handleChange}
              onBlur={formAddress.handleBlur}
            />
            <p className={formAddress.touched.street && formAddress.errors.street ? "form-default__error show" : "form-default__error"}>{formAddress.errors.street}</p>
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
              value={formAddress.values.phone}
              onChange={formAddress.handleChange}
              onBlur={formAddress.handleBlur}
            />
            <p className={formAddress.touched.phone && formAddress.errors.phone ? "form-default__error show" : "form-default__error"}>{formAddress.errors.phone}</p>
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Ghi chú</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <textarea
              type="text"
              className="input-default form-default__input"
              name="note"
              value={formAddress.values.other}
              onChange={formAddress.handleChange}
            />
          </Grid>
        </Grid>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Đặt làm địa chỉ mặc định</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <Switch
              name="isDefault"
              disabled={formAddress.values.checkDefault}
              checked={formAddress.values.isDefault}
              onChange={formAddress.handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <div className="flex-bw-center form-default__bot-nav">
        <p className="btn-df btn-df--del" onClick={() => handleCancel()}>Quay lại</p>
        {formAddress.isSubmitting ?
          <button className="btn-df cursor-disable" type="submit" disabled>Lưu</button> :
          <button className="btn-df" type="submit" >Lưu</button>
        }

      </div>
    </form >
  )
};

export default FormAddress;