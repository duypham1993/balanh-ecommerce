import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { addCustomer, resetStatusSubmit } from "../../../redux/slice/customerSlice";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import FormCustomer from "../../../components/FormCustomer/FormCustomer";

const CreateCustomer = () => {
  const dispatch = useDispatch();
  const statusSubmit = useSelector(selectStatusSubmit("customer"));
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    dateOfBirth: null,
    isActive: false,
  });
  const errorApi = useSelector(selectData("customer", "error"));
  const mess = {
    success: "Tạo khách hàng thành công!",
    error: errorApi.other
  }

  useEffect(() => {
    return () => dispatch(resetStatusSubmit());
  }, [])

  useEffect(() => {
    if (statusSubmit === "fulfilled") {
      setInputs({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        phone: "",
        dateOfBirth: null,
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

  const handleDatePicker = (value) => {
    setInputs({ ...inputs, dateOfBirth: value });
  };

  const handleOnSubmit = () => {
    const newUser = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      gender: inputs.gender,
      phone: inputs.phone,
      dateOfBirth: inputs.dateOfBirth.format("DD/MM/YYYY"),
      isActive: inputs.isActive,
    }
    dispatch(addCustomer(newUser));
  };

  return (
    <div className="add-customer">
      <FormCustomer
        inputs={inputs}
        handleDatePicker={handleDatePicker}
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

export default CreateCustomer;