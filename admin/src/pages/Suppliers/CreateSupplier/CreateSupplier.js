import FormSupplier from "../../../components/FormSupplier/FormSupplier";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStatusSubmit } from "../../../redux/selectors";
import { addSupplier } from "../../../redux/slice/supplierSlice";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { useFormik } from "formik";
import { CREATE_SUPPLIER_SUCCESS, VALIDATE_FORM_SUPPLIER } from "../../../shared/constants";

const CreateSupplier = () => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState({});

  const formSupplier = useFormik({
    initialValues: {
      name: '',
      sku: '',
      email: '',
      phone: '',
      city: '',
      district: '',
      wards: '',
      street: '',
      isActive: false
    },
    validationSchema: VALIDATE_FORM_SUPPLIER,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const supplier = {
        name: values.name,
        sku: values.sku,
        email: values.email,
        phone: values.phone,
        address: {
          city: values.city,
          district: values.district,
          wards: values.wards,
          street: values.district
        },
        isActive: values.isActive
      }
      dispatch(addSupplier(supplier))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: CREATE_SUPPLIER_SUCCESS });
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.sku) formSupplier.errors.sku = error.sku;
          error.other && setMess({ error: error.other });
        })
    }
  })

  return (
    <div className="add-supplier">
      <FormSupplier
        formSupplier={formSupplier}
      />

      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default CreateSupplier;