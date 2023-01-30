import { cityData } from '../../../data/city';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { getLocalCurrentUser } from '../../../utils/localStorage';
import { useSelector } from 'react-redux';

const FormAddress = ({ inputs, address, handleOnChange, handleAddress, handleOnSubmit, checkDefault }) => {
  const { isSubmitting } = useSelector(state => state.address);
  const city = cityData.map(item => item.name);
  const district = cityData.find(item => item.name === address.city[0]);
  const arrDistrict = district?.districts.map(item => item.name);
  const wards = district?.districts.find(item => item.name === address.district[0]);
  const arrWards = wards?.wards.map(item => item.name);
  const customerID = getLocalCurrentUser()?._id;
  const [formErrors, setFormErrors] = useState({});

  const onChangeInputs = (e) => {
    const { value, name } = e.target;

    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
    handleOnChange(e);
  }

  const onChangeAddress = (name, value) => {
    if (value) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
    handleAddress(name, value);
  }

  const validateForm = (inputs) => {
    let error = {};
    const messError = "Vui lòng điền vào mục này!";
    const formatPhone = /^\d{10,12}$/;

    if (!inputs.name.trim()) {
      error.name = messError;
    }

    if (!inputs.address.city || !inputs.address.city.trim()) {
      error.city = messError;
    }

    if (!inputs.address.district || !inputs.address.district.trim()) {
      error.district = messError;
    }

    if (!inputs.address.wards || !inputs.address.wards.trim()) {
      error.wards = messError;
    }

    if (!inputs.address.street.trim()) {
      error.street = messError;
    }

    if (inputs.phone && !formatPhone.test(inputs.phone)) {
      error.phone = "Số điện thoại không hợp lệ!"
    }

    if (!inputs.phone.trim()) {
      error.phone = messError;
    }

    return error;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const deliveryAddress = {
      customerID: customerID,
      name: inputs.name,
      address: {
        city: address.city[0],
        district: address.district[0],
        wards: address.wards[0],
        street: inputs.street
      },
      phone: inputs.phone,
      note: inputs.note,
      isDefault: inputs.isDefault
    }

    setFormErrors(validateForm(deliveryAddress));
    !Object.keys(validateForm(deliveryAddress)).length && handleOnSubmit(deliveryAddress);
  }

  return (
    <form className='py-3' onSubmit={(e) => submitForm(e)}>
      <div className="px-3 py-2">
        <input
          type="text"
          placeholder='Họ và tên'
          name="name"
          className={formErrors.name ? 'w-100 input-df input-error' : 'w-100 input-df'}
          value={inputs.name}
          onChange={(e) => onChangeInputs(e)} />
      </div>
      <div className="px-3 py-2">
        <Typeahead
          clearButton
          className={formErrors.city ? 'w-100 autocomplete-bs autocomplete-bs--error' : 'w-100 autocomplete-bs'}
          id='city'
          selected={address.city}
          onChange={(selected) => onChangeAddress('city', selected)}
          options={city}
          placeholder="Tỉnh/Thành phố"
        />
      </div>
      <div className="px-3 py-2">
        {arrDistrict?.length ?
          <Typeahead
            clearButton
            className={formErrors.district ? 'w-100 autocomplete-bs autocomplete-bs--error' : 'w-100 autocomplete-bs'}
            id='district'
            selected={address.district}
            onChange={(selected) => onChangeAddress('district', selected)}
            options={arrDistrict}
            placeholder="Quận/Huyện"
          /> :
          <Typeahead
            className={formErrors.district ? 'w-100 autocomplete-bs autocomplete-bs--error' : 'w-100 autocomplete-bs'}
            disabled
            id='district'
            selected={address.district}
            onChange={(selected) => onChangeAddress('district', selected)}
            options={city}
            placeholder="Quận/Huyện"
          />
        }
      </div>
      <div className="px-3 py-2">
        {arrWards?.length ?
          <Typeahead
            clearButton
            className={formErrors.wards ? 'w-100 autocomplete-bs autocomplete-bs--error' : 'w-100 autocomplete-bs'}
            id='wards'
            selected={address.wards}
            onChange={(selected) => onChangeAddress('wards', selected)}
            options={arrWards}
            placeholder="Phường/Xã"
          /> :
          <Typeahead
            clearButton
            className={formErrors.wards ? 'w-100 autocomplete-bs autocomplete-bs--error' : 'w-100 autocomplete-bs'}
            disabled
            id='wards'
            selected={address.wards}
            onChange={(selected) => onChangeAddress('wards', selected)}
            options={city}
            placeholder="Phường/Xã"
          />
        }
      </div>
      <div className="px-3 py-2">
        <input
          className={formErrors.street ? 'w-100 input-df input-error' : 'w-100 input-df'}
          type="text"
          name='street'
          placeholder='Địa chỉ cụ thể'
          value={inputs.street}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="px-3 py-2">
        <input
          className={formErrors.phone ? 'w-100 input-df input-error' : 'w-100 input-df'}
          type="text"
          name='phone'
          placeholder='Số điện thoại'
          value={inputs.phone}
          onChange={(e) => onChangeInputs(e)} />
      </div>
      <div className="px-3 py-2">
        <input
          className='w-100 input-df'
          type="text"
          name='note'
          placeholder='Ghi chú'
          value={inputs.note}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className="px-3 py-2">
        <Form.Check
          disabled={checkDefault ? true : false}
          type='checkbox'
          id='isDefault'
          name="isDefault"
          label="Đặt làm địa chỉ mặc định"
          checked={inputs.isDefault}
          onChange={(e) => onChangeInputs(e)}
        />
      </div>
      <div className='d-flex justify-content-center py-2 mt-1'>
        {isSubmitting ?
          <button disabled className='btn-df btn-df--green btn-spinner cursor-wait w-25'>
            <Spinner animation="border" variant="light" className="spinner" size="sm" />
          </button> :
          <button className='btn-df btn-df--green'>
            Hoàn Thành
          </button>
        }
      </div>
    </form>
  );
};

export default FormAddress;