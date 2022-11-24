import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatusSubmit } from "../../../redux/selectors";
import { addSupplier, resetStatusSubmit } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const CreateSupplier = () => {
  const dispatch = useDispatch();
  const statusSubmit = useSelector(selectStatusSubmit("supplier"));
  const [inputs, setInputs] = useState({
    sku: "",
    name: "",
    email: "",
    phone: "",
    isActive: false,
  });
  const [address, setAddress] = useState({
    city: "",
    district: "",
    wards: "",
    street: "",
  });
  const mess = {
    success: "Tạo nhà cung cấp thành công!",
    error: "Tạo nhà cung cấp thất bại!"
  }

  useEffect(() => {
    return () => dispatch(resetStatusSubmit());
  }, [])

  // clear inputs after add supplier success
  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setInputs({
        sku: "",
        name: "",
        email: "",
        phone: "",
        isActive: false,
      });
      setAddress({
        city: "",
        district: "",
        wards: "",
        street: "",
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
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleAutocomplete = (name, value) => {
    setAddress({
      ...address, [name]: value
    })
  }

  const handleStreet = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleOnSubmit = () => {
    const newSupplier = {
      ...inputs, address
    }
    dispatch(addSupplier(newSupplier));
  };

  return (
    <div className="add-supplier">
      <FormSupplier
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

export default CreateSupplier;