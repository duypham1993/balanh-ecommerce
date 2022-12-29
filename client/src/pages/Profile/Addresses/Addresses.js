import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddressList } from "../../../redux/slice/addressSlice";
import { getLocalCurrentUser } from "../../../utils/localStorage";
import AddressItem from "../../../components/Address/AddressItem/AddressItem";
import AddAddress from "../../../components/Address/AddAddress/AddAddress";
import Loading from "../../../components/Loading/Loading";

const Addresses = () => {
  const dispatch = useDispatch();
  const localUser = getLocalCurrentUser();
  const { addressList, isLoading } = useSelector(state => state.address);

  useEffect(() => {
    dispatch(getAddressList(localUser._id));
  }, [])

  return (
    <>
      {isLoading ?
        <Loading /> :
        <Row>
          <Col xs={12} className="mb-md-3">
            <AddAddress />
          </Col>
          {addressList?.map((address, index) => {
            return (
              <Col xs={12} sm={6} md={4} key={index} >
                <AddressItem address={address} id={localUser._id} />
              </Col>
            )
          })}
        </Row>
      }
    </>
  );
};

export default Addresses;