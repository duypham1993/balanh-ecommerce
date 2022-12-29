import { Modal } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import FormAddress from '../FormAddress/FormAddress';
import { useDispatch } from 'react-redux';
import { createAddress } from '../../../redux/slice/addressSlice';

const AddAddress = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
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

  // clear district and wards if city change
  useEffect(() => {
    setAddress({ ...address, district: [], wards: [] })
  }, [cityRef.current]);

  // clear wards if district change
  useEffect(() => {
    setAddress({ ...address, wards: [] })
  }, [districtRef.current]);

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

  const handleOnSubmit = (deliveryAddress) => {
    dispatch(createAddress(deliveryAddress))
      .unwrap()
      .then(() => {
        setShow(false);
        setInputs({
          name: '',
          street: '',
          phone: '',
          note: '',
          isDefault: false
        });
        setAddress({
          city: [],
          district: [],
          wards: [],
        });
      })
  }

  return (
    <div>
      <button onClick={handleShow} className="border bg-transparent border-green text-green my-2 py-1 px-2">Thêm địa chỉ mới</button>
      <Modal show={show} onHide={handleClose} backdrop='static' centered>
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ mới</Modal.Title>
        </Modal.Header>
        <FormAddress
          inputs={inputs}
          address={address}
          handleOnChange={handleOnChange}
          handleAddress={handleAddress}
          handleOnSubmit={handleOnSubmit}
        />
      </Modal>
    </div>
  );
};

export default AddAddress;