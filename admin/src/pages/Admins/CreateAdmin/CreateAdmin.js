import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addAdmin, resetStatusSubmit } from "../../../redux/slice/adminSlice";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const statusSubmit = useSelector(selectStatusSubmit("admin"));
  const [inputs, setInputs] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    isActive: false,
  });
  const errorAPI = useSelector(selectData("admin", "error"));
  const mess = {
    success: "Tạo quản trị viên thành công!",
    error: errorAPI.other
  }

  useEffect(() => {
    dispatch(resetStatusSubmit());
  }, [])

  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setInputs({
        lastName: "",
        firstName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        isActive: false,
      });
    }
  }, [statusSubmit])

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
    const newUser = {
      lastName: inputs.lastName,
      firstName: inputs.firstName,
      email: inputs.email,
      password: inputs.password,
      role: inputs.role,
      isActive: inputs.isActive,
    }
    dispatch(addAdmin(newUser));
  };

  return (
    <div className="add-admin">
      <FormAdmin
        inputs={inputs}
        handleAutocomplete={handleAutocomplete}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateAdmin;