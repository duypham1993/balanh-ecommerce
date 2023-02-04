import Modal from 'react-bootstrap/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect } from 'react';

const SuccessNoti = ({ show, handleClose }) => {

  useEffect(() => {
    const autoClose = setTimeout(handleClose, 2000);
    return () => clearTimeout(autoClose);
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered className="custom-notification">
      <Modal.Body className="text-center text-green">
        <CheckCircleIcon className="fs-1" />
        <p className="mt-2 fs-5">Sản phẩm đã được thêm vào giỏ hàng</p>
      </Modal.Body>
    </Modal>
  )

};

export default SuccessNoti;