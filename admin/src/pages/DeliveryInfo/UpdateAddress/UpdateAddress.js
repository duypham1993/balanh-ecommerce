import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentAddress, resetStatusSubmit, updateAddress } from "../../../redux/slice/deliverySlice";
import FormDeliveryInfo from "../../../components/FormDeliveryInfo/FormDeliveryInfo";
import { useParams } from "react-router-dom";

const UpdateAddress = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const statusSubmit = useSelector(selectStatusSubmit("deliveryInfo"));
  const currentAddress = useSelector(selectData("deliveryInfo", "currentAddress"));
  const cityRef = useRef("");
  const districtRef = useRef("");

  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    phone: "",
    other: "",
  });
  const [address, setAddress] = useState({
    city: "",
    district: "",
    wards: "",
    street: ""
  });
  const mess = {
    success: "Cập nhật địa chỉ thành công!",
    error: "Cập nhật địa chỉ thất bại!"
  }

  useEffect(() => {
    dispatch(getCurrentAddress(id));
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentAddress && Object.keys(currentAddress).length) {
      setInputs({
        email: currentAddress.email,
        name: currentAddress.name,
        phone: currentAddress.phone,
        other: currentAddress.other,
      });

      setAddress({
        city: currentAddress.address.city,
        district: currentAddress.address.district,
        wards: currentAddress.address.wards,
        street: currentAddress.address.street
      });
    }
  }, [currentAddress]);

  // clear children item if change value
  useEffect(() => {
    setAddress({ ...address, district: "", wards: "" });
  }, [cityRef.current]);
  useEffect(() => {
    setAddress({ ...address, wards: "" });
  }, [districtRef.current]);

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAutocomplete = (name, value) => {
    if (name === "city") {
      cityRef.current = address.city;
    }
    if (name === "district") {
      districtRef.current = address.district;
    }
    setAddress({
      ...address, [name]: value
    })
  }

  const handleStreet = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = () => {
    const updatedAddress = {
      ...inputs, address
    }
    dispatch(updateAddress({ id, updatedAddress }));
  };

  return (
    <div className="add-supplier">
      <FormDeliveryInfo
        inputs={inputs}
        address={address}
        handleAutocomplete={handleAutocomplete}
        handleStreet={handleStreet}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        id={id}
      />

      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default UpdateAddress;