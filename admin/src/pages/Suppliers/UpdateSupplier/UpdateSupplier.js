import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import { updateSupplier, resetStatusSubmit, getCurrnetSupplier } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import ErrorFetching from "../../../components/ErrorFetching/ErrorFetching";

const UpdateSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentSupplier = useSelector(selectData("supplier", "currentSupplier"));
  const statusSubmit = useSelector(selectStatusSubmit("supplier"));
  const statusFetching = useSelector(selectData("supplier", "isFetching"));
  const errorApi = useSelector(selectData("supplier", "error"));
  const cityRef = useRef("");
  const districtRef = useRef("");
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
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState("");
  const mess = {
    success: "Cập nhật thành công!",
    error: errorApi.other
  };

  useEffect(() => {
    dispatch(getCurrnetSupplier(id));
    dispatch(resetStatusSubmit());
  }, [])

  useEffect(() => {
    if (currentSupplier && Object.keys(currentSupplier).length) {
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

  // clear children item if change value
  useEffect(() => {
    setAddress({ ...address, district: "", wards: "" });
  }, [cityRef.current]);
  useEffect(() => {
    setAddress({ ...address, wards: "" });
  }, [districtRef.current]);

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
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
    });
  };

  const handleOnSubmit = async () => {
    const updatedSupplier = {
      ...inputs, address
    }
    await dispatch(updateSupplier({ id, updatedSupplier }));
  };

  return (
    <>
      {statusFetching === "rejected" ?
        <ErrorFetching /> :
        <>
          <div className="add-supplier">
            <FormSupplier
              currentSupplier={currentSupplier}
              inputs={inputs}
              address={address}
              handleAutocomplete={handleAutocomplete}
              handleOnChange={handleOnChange}
              handleOnSubmit={handleOnSubmit}
            />
            <SubmitAlert
              statusSubmit={statusSubmit}
              mess={mess}
            />
          </div>
        </>

      }
    </>
  );
};

export default UpdateSupplier;