import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateSupplier, getCurrentSupplier } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { useFormik } from "formik";
import { UPDATE_SUPPLIER_SUCCESS, VALIDATE_FORM_SUPPLIER } from "../../../shared/constants";
import Loading from "../../../components/Loading/Loading";

const UpdateSupplier = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, currentSupplier } = useSelector(state => state.supplier);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCurrentSupplier(id));
  }, []);

  const formSupplier = useFormik({
    initialValues: {
      name: currentSupplier?.name || "",
      sku: currentSupplier?.sku || "",
      email: currentSupplier?.email || "",
      phone: currentSupplier?.phone || "",
      city: currentSupplier.address?.city || "",
      district: currentSupplier.address?.district || "",
      wards: currentSupplier.address?.wards || "",
      street: currentSupplier.address?.street || "",
      isActive: currentSupplier?.isActive || false
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_SUPPLIER,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updateSupplier({ updatedSupplier: values, _id: id }))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: UPDATE_SUPPLIER_SUCCESS });
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.sku) formSupplier.errors.sku = error.sku;
          error.other && setMess({ error: error.other });
        })
    }
  })

  return (
    <>
      {isLoading ?
        <Loading /> :
        <div className="add-supplier">
          <FormSupplier
            formSupplier={formSupplier}
          />
          <SubmitAlert
            mess={mess}
          />
        </div>
      }
    </>
  );
};

export default UpdateSupplier;