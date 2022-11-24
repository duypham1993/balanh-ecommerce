import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addAddress, resetStatusSubmit } from "../../../redux/slice/deliverySlice";
import FormDeliveryInfo from "../../../components/FormDeliveryInfo/FormDeliveryInfo";
import { getCustomers } from "../../../redux/slice/customerSlice";

const CreateAddress = () => {
  const dispatch = useDispatch();
  const statusSubmit = useSelector(selectStatusSubmit("deliveryInfo"));
  const customers = useSelector(selectData("customer", "customers"));
  const listEmail = customers.map(item => item.email);
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
    success: "Tạo nhà cung cấp thành công!",
    error: "Tạo nhà cung cấp thất bại!"
  }

  useEffect(() => {
    dispatch(getCustomers());
    return () => dispatch(resetStatusSubmit());
  }, [])

  // clear inputs after add supplier success
  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setInputs({
        email: "",
        name: "",
        phone: "",
        other: ""
      });
      setAddress({
        city: "",
        district: "",
        wards: "",
        street: ""
      })
    }
  }, [statusSubmit]);

  // clear children item if change value
  useEffect(() => {
    setAddress({ ...address, district: "" });
  }, [address.city]);
  useEffect(() => {
    setAddress({ ...address, wards: "" });
  }, [address.district]);

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAutocomplete = (name, value) => {
    if (name === "email") {
      setInputs({ ...inputs, ["email"]: value })
    } else {
      setAddress({
        ...address, [name]: value
      })
    }
  }

  const handleStreet = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = () => {
    const newAdress = {
      ...inputs, address
    }
    dispatch(addAddress(newAdress));
  };

  return (
    <div className="add-supplier">
      <FormDeliveryInfo
        listEmail={listEmail}
        inputs={inputs}
        address={address}
        handleAutocomplete={handleAutocomplete}
        handleStreet={handleStreet}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />

      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateAddress;