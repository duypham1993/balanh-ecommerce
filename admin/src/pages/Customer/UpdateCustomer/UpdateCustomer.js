import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentCustomer, updateCustomer } from "../../../redux/slice/customerSlice";
import FormCustomer from "../../../components/FormCustomer/FormCustomer";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { UPDATE_CUSTOMER_SUCCESS, VALIDATE_FORM_CUSTOMER } from "../../../shared/constants";
import Loading from "../../../components/Loading/Loading";

const UpdateCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, currentCustomer } = useSelector(state => state.customer);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCurrentCustomer(id));
  }, [id]);


  const formCustomer = useFormik({
    initialValues: {
      name: currentCustomer.name || "",
      email: currentCustomer.email || "",
      password: "",
      gender: currentCustomer.gender || "",
      phone: currentCustomer.phone || "",
      isActive: currentCustomer.isActive || false,
      dateOfBirth: currentCustomer.dateOfBirth || null
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_CUSTOMER,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updateCustomer({ updatedCustomer: values, id: id }))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: UPDATE_CUSTOMER_SUCCESS });
        })
        .catch((error) => {
          setSubmitting(false);
          setMess({ error: error.other });
        })
    }
  })

  return (
    <>
      {isLoading ?
        <Loading /> :
        <>
          <div className="update-customer">
            <FormCustomer
              formCustomer={formCustomer}
            />
            <SubmitAlert
              mess={mess}
            />
          </div>
        </>
      }
    </>
  );
};

export default UpdateCustomer;