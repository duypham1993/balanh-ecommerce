import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCustomers, resetStatusSubmit, updateCustomer } from "../../../redux/slice/customerSlice";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import FormCustomer from "../../../components/FormCustomer/FormCustomer";
import { useParams } from "react-router-dom";
import moment from "moment";

const UpdateCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const customers = useSelector(selectData("customer", "customers"));
  const currentCustomer = customers.filter(item => item._id === id)[0];
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
  const mess = {
    success: "Cập nhật thông tin thành công!",
    error: "Cập nhật thông tin thất bại!"
  }

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentCustomer) {
      setInputs({
        ...inputs,
        name: currentCustomer.name,
        email: currentCustomer.email,
        gender: currentCustomer.gender,
        phone: currentCustomer.phone,
        dateOfBirth: moment(currentCustomer.dateOfBirth, "DD/MM/YYYY"),
        isActive: currentCustomer.isActive,
      });
    }
  }, [currentCustomer])

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
    const updatedCustomer = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      gender: inputs.gender,
      phone: inputs.phone,
      dateOfBirth: inputs.dateOfBirth.format("DD/MM/YYYY"),
      isActive: inputs.isActive,
    }
    dispatch(updateCustomer({
      id, updatedCustomer
    }));
  };

  return (
    <div className="update-customer">
      <FormCustomer
        customers={customers}
        inputs={inputs}
        handleDatePicker={handleDatePicker}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        id={id}
      />
      <SubmitAlert
        statusSubmit={statusSubmit}
        mess={mess}
      />
    </div>
  );
};

export default UpdateCustomer;