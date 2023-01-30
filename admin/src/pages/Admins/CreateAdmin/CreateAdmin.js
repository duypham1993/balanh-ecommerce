import { useState } from "react";
import { useDispatch } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addAdmin } from "../../../redux/slice/adminSlice";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";
import { useFormik } from 'formik';
import { CREATE_ADMIN_SUCCESS, VALIDATE_FORM_ADMIN } from "../../../shared/constants";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState({});

  const formAdmin = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      role: "",
      isActive: false,
    },
    validationSchema: VALIDATE_FORM_ADMIN,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const newUser = {
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
      };

      dispatch(addAdmin(newUser))
        .unwrap()
        .then(() => {
          setMess({ success: CREATE_ADMIN_SUCCESS });
          setSubmitting(false);
          resetForm();
        })
        .catch((error) => {
          if (error.email) formAdmin.errors.email = error.email;
          error.other && setMess({ error: error.other });
          setSubmitting(false);
        })
    }
  });

  return (
    <div className="add-admin">
      <FormAdmin
        formAdmin={formAdmin}
      />
      <SubmitAlert
        mess={mess}
      />
    </div>
  );
};

export default CreateAdmin;