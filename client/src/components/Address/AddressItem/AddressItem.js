import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { deleteAddress } from '../../../redux/slice/addressSlice';
import UpdateAddress from '../UpdateAddress/UpdateAddress';

const AddressItem = ({ address, id }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    dispatch(deleteAddress(address._id));
    setShow(false);
  };

  return (
    <div className="bg-white mb-4 shadow">
      <div className="px-4 pt-4 pb-2">
        <span>Họ tên: </span>
        <span>{address.name}</span>
      </div>
      <div className="px-4 pb-2">
        <span>Số điện thoại: </span>
        <span>{address.phone}</span>
      </div>
      <div className="px-4 pb-3">
        <span>Địa chỉ giao hàng: </span>
        <span>
          {`${address.address?.street}, ${address.address?.wards}, ${address.address?.district}, ${address.address?.city}`}
        </span>
      </div>
      <div className="px-4 py-2 border-top d-flex align-items-center justify-content-between">
        <div>
          <UpdateAddress deliveryAddress={address} />
          {!address.isDefault &&
            <>
              <button className="border-0 bg-white text-gray p-0 ms-2" onClick={handleShow}>
                <DeleteIcon className="fs-6" />
                <span className="ps-1">Xoá</span>
              </button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
              >
                <Modal.Body className='p-4'>
                  <div className='fs-4 mb-4'>Bạn có chắc muốn xoá địa chỉ này?</div>
                  <div className='d-flex justify-content-end align-items-center'>
                    <button className='btn-df border-0 text-gray me-4' onClick={handleClose}>
                      Huỷ bỏ
                    </button>
                    <button className='btn-df btn-df--green' onClick={() => handleDelete()}>Xoá</button>
                  </div>
                </Modal.Body>
              </Modal>
            </>
          }

        </div>

        {address.isDefault && <span className='fs-85 text-green fw-bold'>Mặc định</span>}
      </div>
    </div>
  );
};

export default AddressItem;