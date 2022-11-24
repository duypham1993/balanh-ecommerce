import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentAdmin, resetStatusSubmit, updateAdmin } from "../../../redux/slice/adminSlice";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import ErrorFetching from "../../../components/ErrorFetching/ErrorFetching"

const UpdateAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectData("admin", "currentAdmin"));
  const statusSubmit = useSelector(selectStatusSubmit("admin"));
  const statusFetching = useSelector(selectData("admin", "isFetching"));
  const [inputs, setInputs] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    role: "",
    isActive: false,
  });
  const errorAPI = useSelector(selectData("admin", "error"));
  let mess = {
    success: "Cập nhật quản trị viên thành công!",
    error: errorAPI.other
  };

  useEffect(() => {
    dispatch(getCurrentAdmin(id));
    return () => dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentAdmin && Object.keys(currentAdmin).length) {
      setInputs({
        ...inputs,
        lastName: currentAdmin.lastName,
        firstName: currentAdmin.firstName,
        email: currentAdmin.email,
        role: currentAdmin.role,
        isActive: currentAdmin.isActive,
      });
    }
  }, [currentAdmin]);

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleAutocomplete = (name, value) => {
    setInputs({
      ...inputs, [name]: value
    })
  }

  const handleOnSubmit = () => {
    const updatedAdmin = {
      lastName: inputs.lastName,
      firstName: inputs.firstName,
      email: inputs.email,
      password: inputs.password,
      role: inputs.role,
      isActive: inputs.isActive,
    }
    dispatch(updateAdmin({ id, updatedAdmin }));
  };

  return (
    <>
      {statusFetching === "rejected" ?
        <ErrorFetching /> :
        <div className="update-admin">
          <FormAdmin
            inputs={inputs}
            id={id}
            handleAutocomplete={handleAutocomplete}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
          <SubmitAlert
            statusSubmit={statusSubmit}
            mess={mess}
          />
        </div>
      }
    </>
  );
};

export default UpdateAdmin;