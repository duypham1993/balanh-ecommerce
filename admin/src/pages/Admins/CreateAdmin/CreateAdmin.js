import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addAdmin, getAdmins, resetStatusSubmit } from "../../../redux/slice/adminSlice";
import { selectAdmins, selectStatusAdminSubmit } from "../../../redux/selectors";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admins = useSelector(selectAdmins)
  const statusSubmit = useSelector(selectStatusAdminSubmit);
  const [inputs, setInputs] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    isActive: false,
  });
  const mess = {
    success: "Tạo quản trị viên thành công!",
    error: "Tạo quản trị viên thất bại!"
  }

  useEffect(() => {
    dispatch(getAdmins());
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

  // back to suppliers
  const handleCancel = () => {
    return navigate("/admins");
  }

  return (
    <div className="add-admin">
      <FormAdmin
        admins={admins}
        inputs={inputs}
        setInputs={setInputs}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        handleCancel={handleCancel}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default CreateAdmin;