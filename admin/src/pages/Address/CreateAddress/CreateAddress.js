import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addAddress } from "../../../redux/slice/addressSlice";
import FormAddress from "../../../components/FormAddress/FormAddress";
import { useFormik } from "formik";
import { CREATE_ADDRESS_SUCCESS, VALIDATE_FORM_ADDRESS } from "../../../shared/constants";

const CreateAddress = () => {
  const dispatch = useDispatch();
  const { customers } = useSelector(state => state.customer);
  const [mess, setMess] = useState({});

  const formAddress = useFormik({
    initialValues: {
      email: "",
      name: "",
      city: "",
      district: "",
      wards: "",
      street: "",
      phone: "",
      note: "",
      isDefault: false,
      checkDefault: false
    },
    validationSchema: VALIDATE_FORM_ADDRESS,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const customer = customers.filter(customer => customer.email === values.email)[0];
      const deliveryAddress = {
        customerID: customer._id,
        name: values.name,
        address: {
          city: values.city,
          district: values.district,
          wards: values.wards,
          street: values.street
        },
        phone: values.phone,
        note: values.note,
        isDefault: values.isDefault
      };
      dispatch(addAddress(deliveryAddress))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: CREATE_ADDRESS_SUCCESS });
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          setMess({ error: error.other });
        })
    }
  })

  return (
    <div className="add-address">
      <FormAddress
        formAddress={formAddress}
      />
      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default CreateAddress;