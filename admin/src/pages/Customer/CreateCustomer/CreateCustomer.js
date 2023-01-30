import { useState } from "react";
import { useDispatch } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addCustomer } from "../../../redux/slice/customerSlice";
import FormCustomer from "../../../components/FormCustomer/FormCustomer";
import { useFormik } from "formik";
import { CREATE_CUSTOMER_SUCCESS, VALIDATE_FORM_CUSTOMER } from "../../../shared/constants";

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState({});

  const formCustomer = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      phone: "",
      dateOfBirth: null,
      isActive: false
    },
    validationSchema: VALIDATE_FORM_CUSTOMER,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(addCustomer(values))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: CREATE_CUSTOMER_SUCCESS });
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          if (error.email) formCustomer.errors.email = error.email;
          error.other && setMess({ error: error.other });
        })
    }
  });

  return (
    <div className="add-customer">
      <FormCustomer
        formCustomer={formCustomer}
      />
      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default CreateCustomer;