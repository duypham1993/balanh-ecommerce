import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubmitAlert from "../../../components/SubmitAlert/SubmitAlert";
import { getCurrentAddress, updateAddress } from "../../../redux/slice/addressSlice";
import FormAddress from "../../../components/FormAddress/FormAddress";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { UPDATE_ADDRESS_SUCCESS, VALIDATE_FORM_ADDRESS } from "../../../shared/constants";
import Loading from '../../../components/Loading/Loading';

const UpdateAddress = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, currentAddress } = useSelector(state => state.address);
  const [mess, setMess] = useState({});

  useEffect(() => {
    dispatch(getCurrentAddress(id));
  }, [id]);

  console.log(currentAddress)
  const formAddress = useFormik({
    initialValues: {
      email: currentAddress.email || "",
      name: currentAddress.name || "",
      city: currentAddress.address?.city || "",
      district: currentAddress.address?.district || "",
      wards: currentAddress.address?.wards || "",
      street: currentAddress.address?.street || "",
      phone: currentAddress.phone || "",
      note: currentAddress.note || "",
      isDefault: currentAddress.isDefault || false,
      checkDefault: currentAddress.isDefault || false,
    },
    enableReinitialize: true,
    validationSchema: VALIDATE_FORM_ADDRESS,
    onSubmit: (values, { setSubmitting }) => {
      const updatedAddress = {
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
      dispatch(updateAddress({ updatedAddress: updatedAddress, id: id }))
        .unwrap()
        .then(() => {
          setSubmitting(false);
          setMess({ success: UPDATE_ADDRESS_SUCCESS });
        })
        .catch((error) => {
          setSubmitting(false);
          setMess({ error: error.other });
        })
    }
  })

  return (
    <>
      {isLoading ?
        <Loading /> :
        <div className="update-address">
          <FormAddress
            formAddress={formAddress}
            id={id}
          />
          <SubmitAlert
            mess={mess}
          />
        </div>
      }
    </>

  );
};

export default UpdateAddress;