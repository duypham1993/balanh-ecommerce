import { useEffect, useRef, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { updateAddress } from "../../../redux/slice/addressSlice";
import FormAddress from "../FormAddress/FormAddress";
import EditIcon from '@mui/icons-material/Edit';

const UpdateAddress = ({ deliveryAddress, isOrderPage }) => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [checkDefault, setCheckDefault] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    street: '',
    phone: '',
    note: '',
    isDefault: false
  })
  const [address, setAddress] = useState({
    city: [],
    district: [],
    wards: [],
  });
  const cityRef = useRef("");
  const districtRef = useRef("");

  // sclear district and wards if city change
  useEffect(() => {
    setAddress({ ...address, district: [], wards: [] })
  }, [cityRef.current]);
  // clear wards if district change
  useEffect(() => {
    setAddress({ ...address, wards: [] })
  }, [districtRef.current]);

  useEffect(() => {
    if (Object.keys(deliveryAddress).length) {
      setInputs({
        name: deliveryAddress.name,
        street: deliveryAddress.address.street,
        phone: deliveryAddress.phone,
        note: deliveryAddress.note,
        isDefault: deliveryAddress.isDefault
      });

      setAddress({
        city: [deliveryAddress.address.city],
        district: [deliveryAddress.address.district],
        wards: [deliveryAddress.address.wards],
      });

      setCheckDefault(deliveryAddress.isDefault)
    }
  }, [deliveryAddress]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setInputs({ ...inputs, [name]: checked });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  }

  const handleAddress = (name, value) => {
    if (name === "city") {
      cityRef.current = address.city;
    }
    if (name === "district") {
      districtRef.current = address.district;
    }

    setAddress({
      ...address, [name]: value
    });
  };

  const handleOnSubmit = (address) => {
    dispatch(updateAddress({ id: deliveryAddress._id, updatedAddress: address }))
      .unwrap()
      .then(() => {
        setShow(false);
      })
  }

  return (
    <>
      {isOrderPage ?
        <button className="border-0 bg-transparent text-green" onClick={handleShow}>
          <span className="ps-1">Cập nhật</span>
        </button> :
        <button className="border-0 bg-transparent text-gray" onClick={handleShow}>
          <EditIcon className="fs-6" />
          <span className="ps-1">Cập nhật</span>
        </button>
      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>Cập nhật địa chỉ</Modal.Title>
        </Modal.Header>
        <FormAddress
          inputs={inputs}
          address={address}
          handleOnChange={handleOnChange}
          handleAddress={handleAddress}
          handleOnSubmit={handleOnSubmit}
          checkDefault={checkDefault}
        />

      </Modal>
    </>
  );
};

export default UpdateAddress;