import { useEffect, useState } from "react";
import "./checkout.scss";
import { Container, Row, Col, ListGroup, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getCart } from "../../redux/slice/cartSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { getLocalCurrentUser } from "../../utils/localStorage";
import { getAddressList } from "../../redux/slice/addressSlice";
import AddAddress from "../../components/Address/AddAddress/AddAddress";
import DeliveryAddress from "../../components/Address/DeliveryAddress/DeliveryAddress";
import { createOrder } from "../../redux/slice/orderSlice";
import Loading from "../../components/Loading/Loading";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localUser = getLocalCurrentUser();
  const { cart } = useSelector(state => state.cart);
  const cartCount = cart.products?.reduce((total, currentProduct) => total + currentProduct.qty, 0) || 0;
  const cartTotal = cart.products?.reduce((total, currentProduct) => (total + (currentProduct.qty * currentProduct.price)), 0) || 0;
  const shipping = cartTotal ? 45000 : 0;
  const { addressList, selectedAddress, isLoading } = useSelector(state => state.address);
  const addressDefault = addressList?.filter(address => address.isDefault === true)[0];
  const orderAddress = Object.keys(selectedAddress).length ? selectedAddress : addressDefault;
  const { isSubmitting } = useSelector(state => state.order);
  const [errorApi, setErrorApi] = useState({});

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Object.keys(cart).length) {
      dispatch(getAddressList(localUser._id));
    } else {
      navigate("/cart");
    }
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnSubmit = () => {
    const order = {
      customerID: localUser?._id,
      products: cart.products,
      shippingFee: shipping,
      amount: cartTotal,
      address: {
        _id: orderAddress._id,
        name: orderAddress.name,
        address: {
          city: orderAddress.address.city,
          district: orderAddress.address.district,
          wards: orderAddress.address.wards,
          street: orderAddress.address.street
        },
        phone: orderAddress.phone,
        note: orderAddress.note
      }
    };

    dispatch(createOrder(order))
      .unwrap()
      .then(() => {
        dispatch(deleteCart(cart._id));
        navigate("/orders", { replace: true })
      })
      .catch((error) => {
        setErrorApi(error);
        handleShow();
      })
  };

  const submitError = () => {
    handleClose();
    if (errorApi.reload) {
      window.location.reload();
    }
    if (errorApi.backToCart) {
      navigate("/cart", { replace: true });
      dispatch(getCart(localUser._id));
    }
  }

  return (
    <>
      {
        isLoading ?
          <Loading /> :
          <div className="py-5 checkout">
            <Container>
              <Row>
                <Col lg={5} className="order-lg-2">
                  <ListGroup>
                    <ListGroup.Item className="py-md-3 rounded-0">
                      <div className="d-flex justify-content-between">
                        <span>CHI TIẾT ĐƠN HÀNG</span>
                        <span>{cartCount} SẢN PHẨM</span>
                      </div>
                    </ListGroup.Item>
                    {cart.products?.map((product, index) => {
                      return (
                        <ListGroup.Item key={index} className="py-md-3">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex">
                              <img src={product.imgs[0]} alt={product.name} className="img-50" />
                              <div className="text-break px-3">
                                <p className="mb-1">
                                  <span>{product.name} </span>
                                  <span className="fw-bold">x {product.qty}</span>
                                </p>
                                <p>[{product.packing}]</p>
                              </div>
                            </div>
                            <div>{formatCurrency(product.price)}</div>
                          </div>
                        </ListGroup.Item>
                      )
                    })}
                    <ListGroup.Item className="py-md-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Tổng tiền hàng:</span>
                        <span>{formatCurrency(cartTotal)}</span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(shipping)}</span>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="py-md-3">
                      <div className="d-flex justify-content-between align-items-center fw-bold">
                        <span>Tổng thanh toán:</span>
                        <span>{formatCurrency(cartTotal + shipping)}</span>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col lg={7}>
                  <div className="bg-white border p-3">
                    <h5 className="pb-2">ĐỊA CHỈ NHẬN HÀNG</h5>
                    <div>
                      {addressList.length ?
                        <>
                          <DeliveryAddress
                            address={orderAddress}
                          />
                        </> :
                        <AddAddress />
                      }
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-4">
                {isSubmitting ?
                  <button disabled className="btn-df btn-df--green btn-spinner" >
                    <Spinner animation="border" variant="light" className="spinner" />
                  </button> :
                  <button className="btn-df btn-df--green" onClick={(e) => handleOnSubmit()}>ĐẶT HÀNG</button>
                }
              </div>
            </Container>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header className="justify-content-center">
                <h5 className="mb-0">Tạo đơn hàng thất bại!</h5>
              </Modal.Header>
              <Modal.Body className="text-center">
                {errorApi?.other}
                <div className="d-flex justify-content-center pt-3">
                  <button className="btn-df btn-df--green" onClick={() => submitError()}>
                    Xác nhận
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
      }
    </>
  );
};

export default Checkout;