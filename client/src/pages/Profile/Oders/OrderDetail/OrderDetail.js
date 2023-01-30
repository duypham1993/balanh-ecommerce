import "./order-detail.scss";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentOrder } from "../../../../redux/slice/orderSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { formatCurrency } from "../../../../utils/formatCurrency";
import Loading from "../../../../components/Loading/Loading";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentOrder, isLoading } = useSelector(state => state.order);
  const arrTitle = ["STT", "Sản phẩm", "Số lượng", "Đơn giá", "Tiền hàng"]

  useEffect(() => {
    dispatch(getCurrentOrder(id))
      .unwrap()
      .catch((error) => {
        error.status === 404 && navigate("/page-not-found", { replace: true })
      })
  }, [id]);

  return (
    <>
      {isLoading ?
        <Loading />
        :
        Object.keys(currentOrder).length &&
        <div className="bg-white order-detail shadow-sm">
          <div className="border-bottom">
            <Container fluid="lg">
              <Row className="py-3 mx-md-0">
                <Col xs="4">
                  <Link to="/orders" className="border-0 link-df link-df--gray text-uppercase">
                    <ArrowBackIosIcon className="fs-5" />
                    <span >Trở lại</span>
                  </Link>
                </Col>
                <Col xs="8" className="text-uppercase text-end">
                  <span>Mã đơn hàng: {currentOrder.codeOrder}</span>
                  <span className="px-2">|</span>
                  <span>{currentOrder.status[currentOrder.status.length - 1].title}</span>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="mt-3 mt-md-4">
            <Container fluid="lg">
              <h5 className="m-0 px-md-2">Địa Chỉ Nhận Hàng</h5>
              <Row className="my-3 mx-md-0 my-md-4">
                <Col md={4} className="border-end">
                  <div className="mb-3 mb-md-0">
                    <p>{currentOrder.address.name}</p>
                    <p>{currentOrder.address.phone}</p>
                    <p>{`${currentOrder.address.address.street}, ${currentOrder.address.address.wards}, ${currentOrder.address.address.district}, ${currentOrder.address.address.city}`}</p>
                  </div>
                </Col>
                <Col md={8}>
                  {[...currentOrder.status].reverse().map((status, index, arr) => (
                    <div key={index} className="d-flex">
                      <div className={index + 1 === arr.length ? "me-2 py-1" : "me-2 py-1 position-relative order-detail__step"}>
                        <CircleIcon className="order-detail__step-icon" />
                      </div>
                      <div className="me-2 py-1">
                        {moment(status.time).format("hh:mm DD-MM-YYYY")}
                      </div>
                      <div className="py-1">
                        {status.title}
                      </div>
                    </div>
                  ))}

                </Col>
              </Row>
            </Container>
          </div>
          <div className="px-md-2">
            <Container fluid="lg">
              <Table responsive className="border mb-md-4">
                <thead>
                  <tr>
                    {arrTitle.map((item, index) => (
                      index ?
                        <th key={index} className="border">
                          {item}
                        </th> :
                        <th key={index} className="border w-0 text-center">
                          {item}
                        </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentOrder.products.map((product, index) => (
                    <tr key={index}>
                      <td className="border text-center">{index + 1}</td>
                      <td className="border">{product.name}</td>
                      <td className="border">{product.qty}</td>
                      <td className="border">{formatCurrency(product.price)}</td>
                      <td className="border">{formatCurrency(product.qty * product.price)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="text-center border">Phí ship</td>
                    <td className="border">{formatCurrency(currentOrder.shippingFee)}</td>
                  </tr>
                  <tr className="fw-bold">
                    <td colSpan={4} className="text-center border">Tổng tiền</td>
                    <td className="border">{formatCurrency(currentOrder.shippingFee + currentOrder.amount)}</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      }
    </>

  );
};

export default OrderDetail;