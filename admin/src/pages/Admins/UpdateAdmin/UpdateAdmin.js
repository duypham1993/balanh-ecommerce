import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getAdmins, resetStatusSubmit, updateAdmin } from "../../../redux/slice/adminSlice";
import { selectAdmins, selectStatusAdminSubmit } from "../../../redux/selectors";
import FormAdmin from "../../../components/FormAdmin/FormAdmin";

const UpdateAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admins = useSelector(selectAdmins);
  const currentAdmin = admins.filter(item => item._id === id)[0];
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
    success: "Cập nhật quản trị viên thành công!",
    error: "Cập nhật trị viên thất bại!"
  }

  useEffect(() => {
    dispatch(getAdmins());
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentAdmin) {
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

  // back to suppliers
  const handleCancel = () => {
    return navigate("/admins");
  }

  return (
    <div className="update-admin">
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

export default UpdateAdmin;