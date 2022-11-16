import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentCustomer, resetStatusSubmit, updateCustomer } from "../../../redux/slice/customerSlice";
import { selectData, selectStatusSubmit } from "../../../redux/selectors";
import FormCustomer from "../../../components/FormCustomer/FormCustomer";
import { useParams } from "react-router-dom";
import moment from "moment";
import ErrorFetching from "../../../components/ErrorFetching/ErrorFetching";

const UpdateCustomer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentCustomer = useSelector(selectData("customer", "currentCustomer"));
  const statusSubmit = useSelector(selectStatusSubmit("customer"));
  const statusFetching = useSelector(selectData("customer", "isFetching"));
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
    success: "Cập nhật thông tin thành công!",
    error: errorApi.other
  }

  useEffect(() => {
    dispatch(getCurrentCustomer(id));
    dispatch(resetStatusSubmit());
  }, []);

  useEffect(() => {
    if (currentCustomer && Object.keys(currentCustomer).length) {
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
  }, [currentCustomer]);

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
    <>
      {statusFetching === "rejected" ?
        <ErrorFetching /> :
        <>
          <div className="update-customer">
            <FormCustomer
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
        </>
      }
    </>
  );
};

export default UpdateCustomer;