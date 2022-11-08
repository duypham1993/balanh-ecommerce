import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectSuppliers, selectStatusSubmit } from "../../../redux/selectors";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getSuppliers, resetStatusSubmit, updateSupplier } from "../../../redux/slice/supplierSlice";

const UpdateSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const suppliers = useSelector(selectSuppliers);
  const currentSupplier = suppliers.filter(item => item._id === id)[0];
  const statusSubmit = useSelector(selectStatusSubmit);
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
  })
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getSuppliers());
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
  }, [currentSupplier])

  useEffect(() => {
    statusSubmit === "fulfilled" && setOpen(true);
    dispatch(resetStatusSubmit());
  }, [statusSubmit])

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
    setOpen(true);
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

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateSupplier;