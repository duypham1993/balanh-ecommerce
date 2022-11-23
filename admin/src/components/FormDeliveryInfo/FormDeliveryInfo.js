import { useState } from "react";
import { Grid, Autocomplete, TextField } from '@mui/material';
import { cityData } from "../../data/city";
import { useNavigate } from "react-router-dom";

const FormDeliveryInfo = (props) => {
  const { listEmail, inputs, address, handleAutocomplete, handleStreet, handleOnChange, handleOnSubmit, id } = props;
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const city = cityData.map(item => item.name);
  const district = cityData.find(item => item.name === address.city);
  const arrDistrict = district && district.districts.map(item => item.name);
  const wards = district && district.districts.find(item => item.name === address.district);
  const arrWards = wards && wards.wards.map(item => item.name);

  const handleChangeInputs = (e) => {
    const { value, name } = e.target;
    handleOnChange(e);
    // remove error if target has value
    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  }

  const handleChangeAddress = (name, value) => {

    handleAutocomplete(name, value)
    // remove error if target has value
    if (value) {
      setFormErrors({
        ...formErrors, [name]: "",
      })
    }
  }

  const validate = (inputs) => {
    const errors = {};
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const formatPhone = /^\d{10,12}$/;

    if (!formatEmail.test(inputs.inputs.email)) {
      errors.email = "Email không hợp lệ!";
    }

    if (!inputs.inputs.email.trim()) {
      errors.email = "Vui lòng điền vào mục này!";
    }

    if (!inputs.inputs.name.trim()) {
      errors.name = "Vui lòng điền vào mục này!";
    }

    if (!inputs.address.city.trim()) {
      errors.city = "Vui lòng chọn mục này!";
    }

    if (!inputs.address.district.trim()) {
      errors.district = "Vui lòng chọn mục này!";
    }

    if (!inputs.address.wards.trim()) {
      errors.wards = "Vui lòng chọn mục này!";
    }

    if (!inputs.address.street.trim()) {
      errors.street = "Vui lòng chọn mục này!";
    }

    if (!formatPhone.test(inputs.inputs.phone)) {
      errors.phone = "Số điện thoại không hợp lệ!"
    }

    if (!inputs.inputs.phone.trim()) {
      errors.phone = "Vui lòng điền vào mục này!";
    }

    return errors;
  }

  const submitFrom = (e) => {
    e.preventDefault();
    setFormErrors(validate({ inputs, address }));
    Object.keys(validate({ inputs, address })).length === 0 && handleOnSubmit();
  }

  // back to suppliers
  const handleCancel = () => {
    return navigate("/customers/delivery-info/");
  }

  return (
    <form className="form-default" onSubmit={(e) => submitFrom(e)}>
      <Grid container>
        <Grid container item spacing={3} className="form-default__group">
          <Grid item xs={12} sm={4} className="form-default__label">
            <label>Email khách hàng</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            {!id ?
              <Autocomplete
                disabled
                className="form-default__autocomplete"
                options={listEmail}
                value={inputs.email}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAddress("email", value)}
                renderInput={(params) => <TextField {...params}
                />}
              /> :
              <input
                type="text"
                className="input-default form-default__input"
                name="email"
                value={inputs.email}
                disabled
              />
            }
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
              value={inputs.name}
              onChange={(e) => handleChangeInputs(e)}
            />
            <p className={formErrors.name ? "form-default__error show" : "form-default__error"}>{formErrors.name}</p>
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
              value={address.city}
              isOptionEqualToValue={(option, value) =>
                option.id === value.id
              }
              onChange={(e, value) => handleChangeAddress("city", value)}
              renderInput={(params) => <TextField {...params} name="city"
              />}
            />
            <p className={formErrors.city ? "form-default__error show" : "form-default__error"}>{formErrors.city}</p>
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
                value={address.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAddress("district", value)}
                renderInput={(params) => <TextField {...params}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                disabled
                options={city}
                value={address.district}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAddress("district", value)}
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formErrors.district ? "form-default__error show" : "form-default__error"}>{formErrors.district}</p>
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
                value={address.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAddress("wards", value)}
                renderInput={(params) => <TextField {...params}
                />}
              /> :
              <Autocomplete
                className="form-default__autocomplete"
                options={city}
                disabled
                value={address.wards}
                isOptionEqualToValue={(option, value) =>
                  option.id === value.id
                }
                onChange={(e, value) => handleChangeAddress("wards", value)}
                renderInput={(params) => <TextField {...params}
                />}
              />
            }
            <p className={formErrors.wards ? "form-default__error show" : "form-default__error"}>{formErrors.wards}</p>
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
              value={address.street}
              onChange={(e) => handleStreet(e)}
            />
            <p className={formErrors.street ? "form-default__error show" : "form-default__error"}>{formErrors.street}</p>
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
            <label>Ghi chú</label>
          </Grid>
          <Grid item xs={12} sm={6} className="form-default__content">
            <textarea
              type="text"
              className="input-default form-default__input"
              name="other"
              value={inputs.other}
              onChange={(e) => handleChangeInputs(e)}
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

export default FormDeliveryInfo;