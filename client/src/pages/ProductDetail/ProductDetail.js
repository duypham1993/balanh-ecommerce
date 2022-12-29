import "./product-detail.scss";
import { useEffect, useState } from "react";
import { Container, Row, Col, Ratio, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CarouselImg from "../../components/CarouselImg/CarouselImg";
import { getCurrentProduct } from "../../redux/slice/productSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { formatCurrency } from "../../utils/formatCurrency";
import { useAddToCart } from "../../hooks/useAddToCart";
import Quantity from "../../components/Quantity/Quantity";
import Loading from "../../components/Loading/Loading";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const addToCart = useAddToCart();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading } = useSelector(state => state.product);
  const [product, setProduct] = useState({});
  const { cart, isSubmitting } = useSelector(state => state.cart);
  const checkProduct = cart?.products?.filter(item => item._id === product._id)[0];
  const checkQty = checkProduct ? product.qty - checkProduct.qty : product.qty;
  const maxQty = checkQty < 0 ? 0 : checkQty;
  const [value, setValue] = useState(1);
  const formatPrice = formatCurrency(product.price);

  useEffect(() => {
    dispatch(getCurrentProduct(id))
      .unwrap()
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => {
        error.status === 404 && navigate("/page-not-found", { replace: true })
      })
  }, [id]);

  return (
    <>
      {isLoading ?
        <Loading /> :
        <div className="my-sm-4 my-md-5 product-detail">
          <Container className="bg-white">
            <Row className="justify-content-between">
              <Col xs={12} sm={6}>
                {product.imgs?.length &&
                  < CarouselImg arrImg={product.imgs} />
                }
              </Col>
              <Col xs={12} sm={6} md={5}>
                <div className="mt-3 mb-4 m-sm-0">
                  <h3 className="fs-4 fw-bold mb-2 text-uppercase text-black">
                    {product.name}
                  </h3>
                  <p className="mb-1">
                    Mã tham chiếu: {product.sku}
                  </p>
                  <p className="mb-2">
                    Bình luận ở phía dưới!
                  </p>
                  <p className="fs-5 mt-1">
                    {product.qty <= 0 && "TẠM THỜI HẾT HÀNG"}
                  </p>
                  <p className="text-black fw-bold mt-2 mt-md-4">
                    <span className="fs-5 pe-2">{formatPrice}</span>
                    <span className="text-gray fs-85 fw-normal">Đã gồm thuế</span>
                  </p>
                  <p className="text-red">
                    [{product.packing}]
                  </p>
                  <div className="my-3 my-md-4">
                    <p className="mb-1">SỐ LƯỢNG</p>
                    <Quantity
                      value={value}
                      setValue={setValue}
                      maxQty={maxQty}
                    />
                    {product.qty ?
                      isSubmitting ?
                        <button disabled className="btn-df btn-df--green btn-spinner w-100 cursor-wait">
                          <Spinner animation="border" variant="light" className="spinner" />
                        </button> :
                        <button className="btn-df btn-df--green w-100" onClick={() => addToCart(id, value)}>
                          <ShoppingCartIcon />
                          <span className="ps-1">Cho vào giỏ hàng</span>
                        </button> :
                      <button disabled className="btn-df btn-df--green w-100 cursor-disabled">
                        <RemoveShoppingCartIcon />
                        <span className="ps-1">Tạm thời hết hàng</span>
                      </button>
                    }
                  </div>
                  <div>
                    <p>Mô tả ngắn:</p>
                    <p>{product.desc}</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      }
    </>
  );
};

export default ProductDetail;