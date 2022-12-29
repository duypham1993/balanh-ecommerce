import React from 'react';
import UpdateAddress from '../UpdateAddress/UpdateAddress';

const AddressItemOrderPage = ({ address, index, choose, handleOnChange }) => {
  return (
    <div className={index !== 0 ? "border-top" : ""}>
      <div className="d-flex my-4 justify-content-between">
        <div className="d-flex">
          <div className="pt-1 pe-3">
            <input type="radio" name="choose" value={address._id} id={index} checked={choose === address._id}
              onChange={(e) => handleOnChange(e)} />
          </div>
          <label htmlFor={index}>
            <div>
              <span className="fw-bold fs-5">{address.name}</span>
              <span> | {address.phone}</span>
            </div>
            <div>
              <span>
                {`${address.address.street}, ${address.address.wards}, ${address.address.district}, ${address.address.city}`}
              </span>
            </div>
            {address.isDefault &&
              <div className="pt-2">
                <span className="border border-green text-green py-1 px-2 d-inline-block">Mặc định</span>
              </div>
            }
          </label>
        </div>
        <div className="col-3 col-sm-2">
          <UpdateAddress
            deliveryAddress={address}
            isOrderPage={true}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressItemOrderPage;