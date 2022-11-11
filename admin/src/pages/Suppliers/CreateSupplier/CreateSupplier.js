import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSuppliers, selectStatusSupplierSubmit } from "../../../redux/selectors";
import { addSupplier, getSuppliers, resetStatusSubmit } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const CreateSupplier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector(selectSuppliers)
  const statusSubmit = useSelector(selectStatusSupplierSubmit);
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
    dispatch(getSuppliers());
    dispatch(resetStatusSubmit());
  }, [])

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
  }, [statusSubmit])

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleOnSubmit = () => {
    const newSupplier = {
      ...inputs, address
    }
    dispatch(addSupplier(newSupplier));
  };

  // back to suppliers
  const handleCancel = () => {
    return navigate("/suppliers");
  }

  return (
    <div className="add-supplier">
      <FormSupplier
        suppliers={suppliers}
        inputs={inputs}
        address={address}
        setAddress={setAddress}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleCancel={handleCancel}
      />

      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateSupplier;