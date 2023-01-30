import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentAdmin, updateAdmin } from "../../../redux/slice/adminSlice";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";
import { useFormik } from 'formik';
import { UPDATE_ADMIN_SUCCESS, VALIDATE_FORM_UPDATE_ADMIN } from "../../../shared/constants";
import Loading from "../../../components/Loading/Loading";

const UpdateAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [mess, setMess] = useState({});
  const { isLoading, currentAdmin } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getCurrentAdmin(id));
  }, [id]);

  const formAdmin = useFormik({
    initialValues: {
      lastName: currentAdmin.lastName || "",
      firstName: currentAdmin.firstName || "",
      email: currentAdmin.email || "",
      password: "",
      role: currentAdmin.role || "",
      isActive: currentAdmin.isActive || false
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_UPDATE_ADMIN,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const updateUser = {
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        password: values.password,
        role: values.role,
        isActive: values.isActive,
      };

      dispatch(updateAdmin({ updateUser: updateUser, id: id }))
        .unwrap()
        .then(() => {
          setMess({ success: UPDATE_ADMIN_SUCCESS });
          setSubmitting(false);
          formAdmin.values.password = "";
        })
        .catch((error) => {
          if (error.email) formAdmin.errors.email = error.email;
          error.other && setMess({ error: error.other });
          setSubmitting(false);
        })
    }
  })

  return (
    <>
      {isLoading ?
        <Loading /> :
        <div className="update-admin">
          <FormAdmin
            formAdmin={formAdmin}
          />
          <SubmitAlert
            mess={mess}
          />
        </div>
      }
    </>
  );
};

export default UpdateAdmin;