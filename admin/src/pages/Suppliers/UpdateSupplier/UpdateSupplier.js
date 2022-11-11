import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectSuppliers, selectStatusSupplierSubmit } from "../../../redux/selectors";
import { getSuppliers, updateSupplier, resetStatusSubmit } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";

const UpdateSupplier = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector(selectSuppliers);
  const currentSupplier = suppliers.filter(item => item._id === id)[0];
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
    success: "Cập nhật thành công!",
    error: "Cập nhật thất bại!"
  };

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(resetStatusSubmit());
  }, [])

  useEffect(() => {
    if (currentSupplier) {
      setInputs({
        sku: currentSupplier.sku,
        name: currentSupplier.name,
        email: currentSupplier.email,
        phone: currentSupplier.phone,
        isActive: currentSupplier.isActive
      })
      setAddress({
        city: currentSupplier.address.city,
        district: currentSupplier.address.district,
        wards: currentSupplier.address.wards,
        street: currentSupplier.address.street
      })
    }
  }, [currentSupplier]);

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleOnSubmit = async () => {
    const updatedSupplier = {
      ...inputs, address
    }
    await dispatch(updateSupplier({ id, updatedSupplier }));
  };

  // back to suppliers
  const handleCancel = () => {
    return navigate("/suppliers");
  }

  return (
    <div className="add-supplier">
      <FormSupplier
        suppliers={suppliers}
        currentSupplier={currentSupplier}
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

export default UpdateSupplier;