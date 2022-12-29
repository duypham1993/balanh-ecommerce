import "./delivery-address.scss";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { chooseAddress } from '../../../redux/slice/addressSlice';
import AddAddress from '../AddAddress/AddAddress';
import AddressItemOrderPage from "../AddressItemOrderPage/AddressItemOrderPage";

const DeliveryAddress = ({ address }) => {
  const dispatch = useDispatch();
  const addressList = useSelector(state => state.address.addressList);
  const [show, setShow] = useState(false);
  const [choose, setChoose] = useState(address._id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e) => {
    setChoose(e.target.value);
  }

  const handleOnSubmit = () => {
    dispatch(chooseAddress(choose));
    handleClose();
  }

  return (
    <div className="delivery-address">
      <div className="pb-2">
        <span>Họ tên người nhận: </span>
        <span>{address.name}</span>
      </div>
      <div className="pb-2">
        <span>Số điện thoại: </span>
        <span>{address.phone}</span>
      </div>
      <div className="pb-3">
        <span>Địa chỉ giao hàng: </span>
        <span>
          {`${address.address?.street}, ${address.address?.wards}, ${address.address?.district}, ${address.address?.city}`}
        </span>
      </div>
      <div>
        <button className="btn-df btn-df--green" onClick={handleShow}>
          THAY ĐỔI
        </button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="delivery-address__modal"
          centered
        >
          <Modal.Header className='px-4'>
            <Modal.Title><h5 className="m-0">ĐỊA CHỈ CỦA TÔI</h5></Modal.Title>
          </Modal.Header>
          <Modal.Body className='px-4'>
            {addressList.map((address, index) => (
              <AddressItemOrderPage
                key={index}
                index={index}
                address={address}
                choose={choose}
                handleOnChange={handleOnChange}
              />
            ))}

            <AddAddress />
          </Modal.Body>
          <Modal.Footer className='px-4'>
            <button className='btn-df btn-df--close me-2' onClick={handleClose}>
              HUỶ
            </button>
            <button className='btn-df btn-df--green' onClick={(e) => handleOnSubmit()}>XÁC NHẬN</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DeliveryAddress;